import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import '../../css/Invoice.css';


const InvoiceMainPage = () => {
  const [uniqueATLCodes, setUniqueATLCodes] = useState([]);
  const [selectedATLCcode, setSelectedATLCcode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [detailedPayments, setDetailedPayments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUniqueATLCodes = async () => {
    try {
      const response = await axios.get('http://localhost:8801/invoicemainpge/payment_details/grouped');
      const uniqueCodes = [...new Set(response.data.map(item => item.atlcode))];
      setUniqueATLCodes(uniqueCodes);
      setError('');
      console.log('Unique ATL codes data refreshed successfully.');
    } catch (error) {
      console.error('Error fetching unique ATL codes:', error);
      setError('Failed to fetch unique ATL codes. Please try again.');
      setUniqueATLCodes([]);
    }
  };

  // Use useEffect to fetch unique ATL codes initially and set up a timer for periodic refresh
  useEffect(() => {
    fetchUniqueATLCodes();

    // Set up a timer to refresh unique ATL codes data periodically (e.g., every 1 minute)
    const timer = setInterval(() => {
      fetchUniqueATLCodes();
    }, 3000); //refresh time
    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, []); 


  const handleGenerateInvoice = () => {
    navigate('/InvoiceGenerator');
  };

  const handleViewDetails = async (atlcode) => {
    setSelectedATLCcode(atlcode);
    try {
      const response = await axios.get(`http://localhost:8801/invoicemainpge/payment_details/${encodeURIComponent(atlcode)}`);
      setDetailedPayments(response.data); // Update detailedPayments state
      setError('');
    } catch (error) {
      console.error(`Error fetching details for ATL code ${atlcode}:`, error);
      setError(`Failed to fetch details for ATL code ${atlcode}. Please try again.`);
      setDetailedPayments([]); // Reset detailedPayments on error
    }
  };
  

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generatePDF = async (category, atlcode) => {
    const payments = filterPaymentsByCategoryAndYear(category);

    if (payments.length === 0) {
      console.error(`No ${category} payments available for the selected year.`);
      return;
    }

    try {
      const pdfUrl = '/main.pdf'; // URL to your PDF template
      const pdfBytes = await axios.get(pdfUrl, { responseType: 'arraybuffer' }).then(res => res.data);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      const yearField = form.getTextField('year_period');
      if (yearField) {
        yearField.setText(selectedYear.toString());
      }

      const categoryField = form.getTextField('option');
      if (categoryField) {
        categoryField.setText(category);
      } else {
        console.error('Category field/button not found in the PDF form.');
      }

      const atlcodeField = form.getTextField('atlcode');
      if (atlcodeField) {
        atlcodeField.setText(atlcode);
      } else {
        console.error('ATL code field not found in the PDF form.');
      }

      payments.forEach(payment => {
        const { paymentSlab, amount, date } = payment;
        const fieldName = paymentSlab.toLowerCase();
        const textField = form.getTextField(fieldName);

        if (textField) {
          textField.setText(amount.toString());
        } else {
          console.error(`Text field "${fieldName}" not found in the PDF form.`);
        }

        if (paymentSlab === 'granted') {
          const grantedPayment = detailedPayments.find(
            p => p.paymentSlab === 'granted' && p.year === selectedYear
          );

          if (grantedPayment) {
            const grantedDate = grantedPayment.date;
            const formattedDate = formatDate(grantedDate); // Use formatDate function
            const dateField = form.getTextField('date');

            if (dateField) {
              dateField.setText(formattedDate);
            } else {
              console.error('Date field not found in the PDF form.');
            }
          } else {
            console.error(`No 'granted' payment found for year ${selectedYear}.`);
          }
        }
      });

      const lastBalanceField = form.getTextField('last_balance');
      const interestField = form.getTextField('interest');
      const grantedField = form.getTextField('granted');
      const intpaidField = form.getTextField('intpaid');
      const expenditureField = form.getTextField('expenditure');

      if (lastBalanceField && interestField && grantedField && intpaidField && expenditureField) {
        const lastBalance = parseFloat(lastBalanceField.getText() || '0');
        const interest = parseFloat(interestField.getText() || '0');
        const granted = parseFloat(grantedField.getText() || '0');
        const intpaid = parseFloat(intpaidField.getText() || '0');
        const expenditure = parseFloat(expenditureField.getText() || '0');




        const calculatedResult = lastBalance + interest + granted - intpaid;
        const totalAvailFund = calculatedResult; // Define totalAvailFund here


        const resultField = form.getTextField('total');
        if (resultField) {
          resultField.setText(calculatedResult.toString());

          const closingAmount = calculatedResult - expenditure;

          const closingAmountField = form.getTextField('closing_balance');
          if (closingAmountField) {
            closingAmountField.setText(closingAmount.toString());

            const cash2Field = form.getTextField('cash2');
            if (cash2Field) {
              cash2Field.setText(closingAmount.toString());
            }

            const total3Field = form.getTextField('total3');
            if (total3Field) {
              total3Field.setText(closingAmount.toString());
            }
          } else {
            console.error('Closing balance field not found in the PDF form.');
          }

          const grantInField = form.getTextField('grant_in');
          if (grantInField) {
            grantInField.setText(expenditure.toString());
          }

          const total2Field = form.getTextField('total2');
          if (total2Field) {
            total2Field.setText(expenditure.toString());
          }
        } else {
          console.error('Total field not found in the PDF form.');
        }
        const schemaField = form.getTextField('schema_name');
        if (schemaField) {
          schemaField.setText('Atal Innovation Mission(AIM) including Self Employment and Talent Utilization (SETU) - [2351]');
        }

        const advancesField = form.getTextField('advances');
        if (advancesField) {
          advancesField.setText('0');
        }

        const advances2Field = form.getTextField('advances2');
        if (advances2Field) {
          advances2Field.setText('0');
        }

        const grantedSalaryField = form.getTextField('granted_salary');
        if (grantedSalaryField) {
          grantedSalaryField.setText('NA');
        }

        const grantedAssetField = form.getTextField('granted_assest');
        if (grantedAssetField) {
          grantedAssetField.setText('NA');
        }

        // Set lastBalance to cash1 and total1 fields
        const cash1Field = form.getTextField('cash1');
        if (cash1Field) {
          cash1Field.setText(lastBalance.toString());
        }

        const total1Field = form.getTextField('total1');
        if (total1Field) {
          total1Field.setText(lastBalance.toString());
        }



        try {
          const pdfData = {
            atlcode: atlcode,
            year: selectedYear.toString(),
            paymentCategory: category,
            cash_inhand: lastBalanceField ? lastBalanceField.getText() : '0',
            interest: interestField ? interestField.getText() : '0',
            intpaid: intpaidField ? intpaidField.getText() : '0',
            granted: grantedField ? grantedField.getText() : '0',
            granted_date: formatDate(detailedPayments.find(p => p.paymentSlab === 'granted' && p.year === selectedYear)?.date || ''),
            total_avail_fund: totalAvailFund.toString(),
            expenditure: expenditureField ? expenditureField.getText() : '0',
            closing_balance: (calculatedResult - expenditure).toString(),
          };

          const response = await axios.post('http://localhost:8801/savePdfData', pdfData);
          console.log(response.data); // Log success message or handle response
        } catch (error) {
          console.error('Error sending PDF data to backend:', error);
        }


        // Handling closing_balance based on category
        if (category === 'RECURRING') {
          try {
            const closingBalanceResponse = await axios.get(`http://localhost:8801/closing_balance`, {
              params: {
                atlcode: atlcode,
                year: selectedYear.toString()
              }
            });
            const closingBalance = parseFloat(closingBalanceResponse.data.closing_balance);
            console.log('Fetched closing_balance:', closingBalance);

            // Save closing balance to backend through /invoice endpoint
            const closingBalanceData = {
              atlcode: atlcode,
              year: selectedYear.toString(),
              paymentSlab: 'last_balance',
              paymentCategory: 'NON-RECURRING',
              amount: closingBalance.toString(),
              referenceNumber: '0',
              date: formatDate(new Date()) // Use current date or specific date

            };

            try {
              const response = await axios.post('http://localhost:8801/invoices', closingBalanceData);
              console.log(response.data); // Log success message or handle response
            } catch (error) {
              console.error('Error saving closing balance:', error);
            }
          } catch (error) {
            console.error('Error fetching closing balance:', error);
          }
        }


        const pdfBytesResult = await pdfDoc.save();
        const blob = new Blob([pdfBytesResult], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        console.error('Some required fields are missing in the PDF form.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }

  };

  const filterPaymentsByCategoryAndYear = (category) => {
    return filterAndAggregatePayments(category).filter(payment => payment.year === selectedYear);
  };

  const filterAndAggregatePayments = (category) => {
    const filteredPayments = detailedPayments.filter(payment => payment.paymentCategory === category);
    const aggregatedPayments = {};

    filteredPayments.forEach(payment => {
      const key = `${payment.paymentSlab}-${payment.year}`;

      if (!aggregatedPayments[key]) {
        aggregatedPayments[key] = {
          paymentSlab: payment.paymentSlab,
          amount: parseFloat(payment.amount),
          date: payment.date,
          year: payment.year
        };
      } else {
        aggregatedPayments[key].amount += parseFloat(payment.amount);
      }
    });

    return Object.values(aggregatedPayments);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Invoice Main Page</h1>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
        <button className="btn btn-primary" onClick={handleGenerateInvoice}>Generate Invoice</button>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {uniqueATLCodes.length > 0 && (
        <div>
          <h2>ATL Codes</h2>
          <ul className="list-group mb-4">
            {uniqueATLCodes.map((atlcode, index) => (
              <li key={index} className="list-group-item">
                <button className="btn btn-outline-dark" onClick={() => handleViewDetails(atlcode)}>{atlcode}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedATLCcode && detailedPayments.length > 0 && (
        <div className="mb-4">
          <h2>Payments for ATL Code: {selectedATLCcode}</h2>
          {[...new Set(detailedPayments.map(payment => payment.year))].map(year => (
            <div key={year} className="mb-3">
              <h3 onClick={() => handleYearClick(year)} className="year-heading">{year}</h3>
              {selectedYear === year && (
                <>
                  {filterPaymentsByCategoryAndYear('RECURRING').length > 0 && (
                    <div>
                      <h4>Recurring Payments</h4>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Payment Slab</th>
                            <th>Total Amount</th>
                            <th>Date</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterPaymentsByCategoryAndYear('RECURRING').map((payment, index) => (
                            <tr key={index}>
                              <td>{payment.paymentSlab}</td>
                              <td>{payment.amount}</td>
                              <td>{formatDate(payment.date)}</td>
                              <td>{payment.year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button className="btn btn-primary" onClick={() => generatePDF('RECURRING', selectedATLCcode)}>
                        Generate PDF
                      </button>
                    </div>
                  )}
                  {filterPaymentsByCategoryAndYear('NON-RECURRING').length > 0 && (
                    <div>
                      <h4>Non-Recurring Payments</h4>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Payment Slab</th>
                            <th>Total Amount</th>
                            <th>Date</th>
                            <th>Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterPaymentsByCategoryAndYear('NON-RECURRING').map((payment, index) => (
                            <tr key={index}>
                              <td>{payment.paymentSlab}</td>
                              <td>{payment.amount}</td>
                              <td>{formatDate(payment.date)}</td>
                              <td>{payment.year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button className="btn btn-primary" onClick={() => generatePDF('NON-RECURRING', selectedATLCcode)}>
                        Generate PDF
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default InvoiceMainPage;
