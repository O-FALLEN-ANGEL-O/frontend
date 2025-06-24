import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import './SchoolDashboard.css';
import { useNavigate } from 'react-router-dom';


function SchoolDashboard() {
  const [schoolInfo, setSchoolInfo] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedSchoolInfo, setEditedSchoolInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAtlCode = async () => {
      setLoading(true);
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8801/getAtlCode?username=${username}`);
        const { atlcode } = response.data;

        if (atlcode) {
          const schoolResponse = await axios.get(`http://localhost:8801/schooldashboard/schoolInfo/${atlcode}`);
          setSchoolInfo(schoolResponse.data.data);

          const paymentResponse = await axios.get(`http://localhost:8801/schooldashboard/paymentDetails/${atlcode}`);
          const sortedPayments = paymentResponse.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setPaymentDetails(sortedPayments);
        } else {
          setError('ATL code not found for this username');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
      setLoading(false);
    };

    fetchAtlCode();
  }, []);

  const handleEditClick = () => {
    setEditedSchoolInfo(schoolInfo[0]);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSchoolInfo({ ...editedSchoolInfo, [name]: value });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const groupPaymentsByYear = (payments) => {
    const grouped = {};
    payments.forEach((payment) => {
      const year = payment.year !== null && payment.year !== undefined ? payment.year.toString() : 'Unknown';
      const paymentSlab = payment.paymentSlab;

      if (!grouped[year]) {
        grouped[year] = {};
      }

      if (!grouped[year][paymentSlab]) {
        grouped[year][paymentSlab] = [];
      }

      grouped[year][paymentSlab].push(payment);
    });

    return grouped;
  };

  const handleOpenInvoiceGenerator = () => {
    navigate('/InvoiceGenerator');
  };


  const handleSaveChanges = async () => {
    try {
      const response = await axios.post('http://localhost:8801/schooldashboard/updateSchoolInfo', editedSchoolInfo);
      if (response.data.success) {
        // Update local state with the response if needed
        setSchoolInfo(response.data.data);
        setEditMode(false); // Exit edit mode
      } else {
        setError('Failed to save changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  return (
    <div className="py-4">
      <h2 className="mb-4 text-center">School Dashboard</h2>
      {loading ? (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">College Information</Card.Title>
                <div className="college-info-table">
                  <table className="table table-striped">
                    <tbody>
                      {editMode ? (
                        <>
                          <tr>
                            <td><strong>ID:</strong></td>
                            <td>{editedSchoolInfo.id}</td>
                          </tr>
                          <tr>
                            <td><strong>College Name:</strong></td>
                            <td>{editedSchoolInfo.collegeName}</td>
                          </tr>
                          <tr>
                            <td><strong>Sanction Number:</strong></td>
                            <td>{editedSchoolInfo.sanctionNo}</td>
                          </tr>
                          <tr>
                            <td><strong>UDISE:</strong></td>
                            <td>{editedSchoolInfo.udise}</td>
                          </tr>
                          <tr>
                            <td><strong>From Date:</strong></td>
                            <td>{editedSchoolInfo.fromDate}</td>
                          </tr>
                          <tr>
                            <td><strong>Inauguration Date:</strong></td>
                            <td>{editedSchoolInfo.inaugurationDate}</td>
                          </tr>
                          <tr>
                            <td><strong>Principal Name:</strong></td>
                            <td>{editedSchoolInfo.principalName}</td>
                          </tr>
                          <tr>
                            <td><strong>ATL Code:</strong></td>
                            <td>{editedSchoolInfo.atlcode}</td>
                          </tr>
                          <tr>
                            <td><strong>Dashboard Password:</strong></td>
                            <td><input type="text" name="dashboardPassword" value={editedSchoolInfo.dashboardPassword || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>GEM Code:</strong></td>
                            <td><input type="text" name="gemcode" value={editedSchoolInfo.gemcode || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>GEM Password:</strong></td>
                            <td><input type="text" name="gemPassword" value={editedSchoolInfo.gemPassword || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Government Email:</strong></td>
                            <td><input type="text" name="govtEmail" value={editedSchoolInfo.govtEmail || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Government Mail Password:</strong></td>
                            <td><input type="text" name="govtMailPassword" value={editedSchoolInfo.govtMailPassword || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>PFMS:</strong></td>
                            <td><input type="text" name="pfms" value={editedSchoolInfo.pfms || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>PFMS Password:</strong></td>
                            <td><input type="text" name="pfmsPassword" value={editedSchoolInfo.pfmsPassword || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>PFMS OP:</strong></td>
                            <td><input type="text" name="pfmsOP" value={editedSchoolInfo.pfmsOP || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>PFMS OP Password:</strong></td>
                            <td><input type="text" name="pfmsOPPassword" value={editedSchoolInfo.pfmsOPPassword || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>PFMS AP:</strong></td>
                            <td><input type="text" name="pfmsAP" value={editedSchoolInfo.pfmsAP || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>PFMS AP Password:</strong></td>
                            <td><input type="text" name="pfmsAPPassword" value={editedSchoolInfo.pfmsAPPassword || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Alt Incharge:</strong></td>
                            <td><input type="text" name="altIncharge" value={editedSchoolInfo.altIncharge || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Alt Phone:</strong></td>
                            <td><input type="text" name="altPhone" value={editedSchoolInfo.altPhone || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Registered Email:</strong></td>
                            <td><input type="text" name="registeredEmail" value={editedSchoolInfo.registeredEmail || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Registered Phone:</strong></td>
                            <td><input type="text" name="registeredPhone" value={editedSchoolInfo.registeredPhone || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Bharatkosh:</strong></td>
                            <td><input type="text" name="bharatkosh" value={editedSchoolInfo.bharatkosh || ''} onChange={handleInputChange} /></td>
                          </tr>
                          <tr>
                            <td><strong>Bharatkosh Password:</strong></td>
                            <td><input type="text" name="bharatkoshPassword" value={editedSchoolInfo.bharatkoshPassword || ''} onChange={handleInputChange} /></td>
                          </tr>

                        </>
                      ) : (
                        <>
                          {schoolInfo.length > 0 ? (
                            <>
                              <tr>
                                <td><strong>ID:</strong></td>
                                <td>{schoolInfo[0].id}</td>
                              </tr>
                              <tr>
                                <td><strong>College Name:</strong></td>
                                <td>{schoolInfo[0].collegeName}</td>
                              </tr>
                              <tr>
                                <td><strong>Sanction No:</strong></td>
                                <td>{schoolInfo[0].sanctionNo}</td>
                              </tr>
                              <tr>
                                <td><strong>UDISE:</strong></td>
                                <td>{schoolInfo[0].udise}</td>
                              </tr>
                              <tr>
                                <td><strong>From Date:</strong></td>
                                <td>{schoolInfo[0].fromDate}</td>
                              </tr>
                              <tr>
                                <td><strong>Inauguration Date:</strong></td>
                                <td>{schoolInfo[0].inaugurationDate}</td>
                              </tr>
                              <tr>
                                <td><strong>Principal Name:</strong></td>
                                <td>{schoolInfo[0].principalName}</td>
                              </tr>
                              <tr>
                                <td><strong>ATL Code:</strong></td>
                                <td>{schoolInfo[0].atlcode}</td>
                              </tr>
                              <tr>
                                <td><strong>Dashboard Password:</strong></td>
                                <td>{schoolInfo[0].dashboardPassword}</td>
                              </tr>
                              <tr>
                                <td><strong>GEM Code:</strong></td>
                                <td>{schoolInfo[0].gemcode}</td>
                              </tr>
                              <tr>
                                <td><strong>GEM Password:</strong></td>
                                <td>{schoolInfo[0].gemPassword}</td>
                              </tr>
                              <tr>
                                <td><strong>Government Email:</strong></td>
                                <td>{schoolInfo[0].govtEmail}</td>
                              </tr>
                              <tr>
                                <td><strong>Government Mail Password:</strong></td>
                                <td>{schoolInfo[0].govtMailPassword}</td>
                              </tr>
                              <tr>
                                <td><strong>PFMS:</strong></td>
                                <td>{schoolInfo[0].pfms}</td>
                              </tr>
                              <tr>
                                <td><strong>PFMS Password:</strong></td>
                                <td>{schoolInfo[0].pfmsPassword}</td>
                              </tr>
                              <tr>
                                <td><strong>PFMS OP:</strong></td>
                                <td>{schoolInfo[0].pfmsOP}</td>
                              </tr>
                              <tr>
                                <td><strong>PFMS OP Password:</strong></td>
                                <td>{schoolInfo[0].pfmsOPPassword}</td>
                              </tr>
                              <tr>
                                <td><strong>PFMS AP:</strong></td>
                                <td>{schoolInfo[0].pfmsAP}</td>
                              </tr>
                              <tr>
                                <td><strong>PFMS AP Password:</strong></td>
                                <td>{schoolInfo[0].pfmsAPPassword}</td>
                              </tr>
                              <tr>
                                <td><strong>Alt Incharge:</strong></td>
                                <td>{schoolInfo[0].altIncharge}</td>
                              </tr>
                              <tr>
                                <td><strong>Alt Phone:</strong></td>
                                <td>{schoolInfo[0].altPhone}</td>
                              </tr>
                              <tr>
                                <td><strong>Registered Email:</strong></td>
                                <td>{schoolInfo[0].registeredEmail}</td>
                              </tr>
                              <tr>
                                <td><strong>Registered Phone:</strong></td>
                                <td>{schoolInfo[0].registeredPhone}</td>
                              </tr>
                              <tr>
                                <td><strong>Bharatkosh:</strong></td>
                                <td>{schoolInfo[0].bharatkosh}</td>
                              </tr>
                              <tr>
                                <td><strong>Bharatkosh Password:</strong></td>
                                <td>{schoolInfo[0].bharatkoshPassword}</td>
                              </tr>
                            </>
                          ) : (
                            <tr>
                              <td colSpan="2" className="text-muted text-center">No school information available for the provided ATL code.</td>
                            </tr>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                  {editMode && (
                    <div className="text-center mt-3">
                      <Button variant="primary" className="mr-2" onClick={handleSaveChanges}>Save Changes</Button>
                      <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                    </div>
                  )}
                  {!editMode && (
                    <div className="text-center mt-3">
                      <Button variant="info" onClick={handleEditClick}>Edit</Button>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">Payment Details</Card.Title>
                <Button variant="success" className="float-right" onClick={handleOpenInvoiceGenerator}>
                  Add Payment
                </Button>
                {Object.entries(groupPaymentsByYear(paymentDetails)).map(([year, yearDetails]) => (
                  <div key={year}>
                    <h4 className="mt-3">{year}</h4>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Payment Slab</th>
                          <th>Total Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(yearDetails).map(([paymentSlab, payments]) => (
                          <tr key={paymentSlab}>
                            <td>{paymentSlab}</td>
                            <td>
                              Rs. {payments.reduce((total, payment) => total + parseFloat(payment.amount), 0).toFixed(2)}
                            </td>
                            <td>{payments[0].date ? new Date(payments[0].date).toLocaleDateString() : 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default SchoolDashboard;
