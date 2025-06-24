import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/Invoice.css';


const InvoiceGenerator = () => {
  const [formData, setFormData] = useState({
    atlcode: '',
    paymentCategory: '', // Initialize all form fields here
    paymentSlab: '',
    date: '',
    amount: '',
    referenceNumber: '',
    year: '',
  });



  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { paymentSlab, amount } = formData;

      // Clone the formData to prepare data for submission
      let dataToSubmit = { ...formData };

      // Assign the amount to the appropriate field based on paymentSlab
      if (paymentSlab === 'interest') {
        dataToSubmit.interest = amount;
      } else if (paymentSlab === 'intpaid') {
        dataToSubmit.intpaid = amount;
      } else if (paymentSlab === 'expenditure') {
        dataToSubmit.expenditure = amount;
      } else if (paymentSlab === 'granted') {
        dataToSubmit.granted = amount;
      }

      const response = await axios.post('http://localhost:8801/invoices', dataToSubmit);
      const invoiceId = response.data.invoiceId;

      alert('Invoice created successfully');

      // Clear the form fields after successful submission
      setFormData({
        atlcode: '',
        paymentCategory: '',
        paymentSlab: '',
        date: '',
        amount: '',
        referenceNumber: '',
      });

      // Navigate back to the previous page
      navigate(-1); // This navigates back one step in the history stack
    } catch (error) {
      console.error('Failed to create invoice:', error);
      setError('Failed to create invoice. Please try again.');
    }
  };

  const generateYearOptions = () => {
    const options = [];
    for (let year = 2017; year <= 2040; year++) {
      const startYear = year;
      const endYear = year + 1;
      const optionLabel = `Apr-${startYear} to Mar-${endYear}`;
      options.push(
        <option key={year} value={optionLabel}>
          {optionLabel}
        </option>
      );
    }
    return options;
  };


  return (
    <div className="InvoiceGenerator container">
      <h1>Invoice Generator</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="mb-3">
            <label htmlFor="paymentCategory" className="form-label">
              Payment Category:
            </label>
            <select
              className="form-select"
              id="paymentCategory"
              name="paymentCategory"
              value={formData.paymentCategory}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Payment Category</option>
              <option value="RECURRING">Recurring</option>
              <option value="NON-RECURRING">Non-Recurring</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="paymentSlab">Payment Slab:</label>
            <select
              className="form-control"
              id="paymentSlab"
              name="paymentSlab"
              value={formData.paymentSlab}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Payment Slab</option>
              <option value="granted">Grant</option>
              <option value="interest">Interest</option>
              <option value="intpaid">Int Paid</option>
              <option value="expenditure">Expenditure</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="atlcode">ATL Code:</label>
            <input
              type="text"
              className="form-control"
              id="atlcode"
              name="atlcode"
              value={formData.atlcode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="year">Select Year Range:</label>
            <select
              className="form-control"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Year</option>
              {generateYearOptions()}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="referenceNumber">Reference Number:</label>
            <input
              type="text"
              className="form-control"
              id="referenceNumber"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceGenerator;
