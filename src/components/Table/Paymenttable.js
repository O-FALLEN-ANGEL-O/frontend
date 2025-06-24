import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Alert, Button, Form, Table, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Paymenttable.css'; // Custom CSS for Paymenttable

function Paymenttable() {
    const [payments, setPayments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [viewedPayment, setViewedPayment] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        atlcode: '',
        paymentCategory: '',
        paymentSlab: '',
        date: '',
        amount: '',
        comment: '',
        file: '',
        vendor: '',
        paymentType: '',
        referenceNumber: '',
        pfms: '',
        last_balance: '',
        interest: '',
        intpaid: '',
        granted: '',
        total: '',
        balance: '',
        form_type: '',
        schema_type: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchPayments();
    }, []);

    async function fetchPayments() {
        try {
            const response = await axios.get("http://localhost:8801/admindashboard/paymenttable");
            setPayments(response.data.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                await handleAddPayment();
            } else {
                await handleUpdatePayment();
            }
            fetchPayments();
            resetFormData();
        } catch (error) {
            console.error('Error adding/updating payment:', error);
            setAlertMessage('Error adding/updating payment.');
            setShowAlert(true);
        }
    }

    async function handleAddPayment() {
        try {
            await axios.post("http://localhost:8801/admindashboard/paymenttable", formData);
            handleCloseModal();
            setAlertMessage('Payment added successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error adding payment:', error);
            setAlertMessage('Error adding payment.');
            setShowAlert(true);
        }
    }

    async function handleUpdatePayment() {
        try {
            await axios.put(`http://localhost:8801/admindashboard/paymenttable/${formData.id}`, formData);
            handleCloseModal();
            setAlertMessage('Payment updated successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating payment:', error);
            setAlertMessage('Error updating payment.');
            setShowAlert(true);
        }
    }

    async function handleDelete(payment_id) {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this payment?');
            if (confirmDelete) {
                await axios.delete(`http://localhost:8801/admindashboard/paymenttable/${payment_id}`);
                fetchPayments();
                setAlertMessage('Payment deleted successfully.');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error deleting payment:', error);
            setAlertMessage('Error deleting payment.');
            setShowAlert(true);
        }
    }

    function handleCloseModal() {
        setShowModal(false);
        resetFormData();
    }

    function handleOpenAddModal() {
        setModalMode('add');
        setShowModal(true);
    }

    function handleOpenEditModal(payment) {
        setModalMode('edit');
        setFormData(payment);
        setShowModal(true);
    }

    function handleOpenViewModal(payment) {
        setModalMode('view');
        setViewedPayment(payment);
        setShowModal(true);
    }

    function handleCloseAlert() {
        setShowAlert(false);
    }

    function resetFormData() {
        setFormData({
            id: null,
            atlcode: '',
            paymentCategory: '',
            paymentSlab: '',
            date: '',
            amount: '',
            comment: '',
            file: '',
            vendor: '',
            paymentType: '',
            referenceNumber: '',
            pfms: '',
            last_balance: '',
            interest: '',
            intpaid: '',
            granted: '',
            total: '',
            balance: '',
            form_type: '',
            schema_type: ''
        });
    }

    return (
        <div className="container">
            <Row className="mt-3 mb-3">
                <Col>
                    <Button variant="primary" onClick={handleOpenAddModal}>
                        <FontAwesomeIcon icon={faPlus} /> Add Payment
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'add' ? 'Add Payment' : modalMode === 'edit' ? 'Edit Payment' : 'View Payment'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalMode === 'view' && viewedPayment && (
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td><strong>ID</strong></td>
                                    <td>{viewedPayment.id}</td>
                                </tr>
                                <tr>
                                    <td><strong>ATL Code</strong></td>
                                    <td>{viewedPayment.atlcode}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Category</strong></td>
                                    <td>{viewedPayment.paymentCategory}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Slab</strong></td>
                                    <td>{viewedPayment.paymentSlab}</td>
                                </tr>
                                <tr>
                                    <td><strong>Date</strong></td>
                                    <td>{viewedPayment.date}</td>
                                </tr>
                                <tr>
                                    <td><strong>Amount</strong></td>
                                    <td>{viewedPayment.amount}</td>
                                </tr>
                                <tr>
                                    <td><strong>Comment</strong></td>
                                    <td>{viewedPayment.comment}</td>
                                </tr>
                                <tr>
                                    <td><strong>File</strong></td>
                                    <td>{viewedPayment.file}</td>
                                </tr>
                                <tr>
                                    <td><strong>Vendor</strong></td>
                                    <td>{viewedPayment.vendor}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Type</strong></td>
                                    <td>{viewedPayment.paymentType}</td>
                                </tr>
                                <tr>
                                    <td><strong>Reference Number</strong></td>
                                    <td>{viewedPayment.referenceNumber}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS</strong></td>
                                    <td>{viewedPayment.pfms}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                    {(modalMode === 'add' || modalMode === 'edit') && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="atlcode">
                                <Form.Label>ATL Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter ATL code" value={formData.atlcode} onChange={(e) => setFormData({ ...formData, atlcode: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="paymentCategory">
                                <Form.Label>Payment Category</Form.Label>
                                <Form.Control type="text" placeholder="Enter payment category" value={formData.paymentCategory} onChange={(e) => setFormData({ ...formData, paymentCategory: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="paymentSlab">
                                <Form.Label>Payment Slab</Form.Label>
                                <Form.Control type="text" placeholder="Enter payment slab" value={formData.paymentSlab} onChange={(e) => setFormData({ ...formData, paymentSlab: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="text" placeholder="Enter date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="text" placeholder="Enter amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="comment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter comment" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="file">
                                <Form.Label>File</Form.Label>
                                <Form.Control type="text" placeholder="Enter file" value={formData.file} onChange={(e) => setFormData({ ...formData, file: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="vendor">
                                <Form.Label>Vendor</Form.Label>
                                <Form.Control type="text" placeholder="Enter vendor" value={formData.vendor} onChange={(e) => setFormData({ ...formData, vendor: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="paymentType">
                                <Form.Label>Payment Type</Form.Label>
                                <Form.Control type="text" placeholder="Enter payment type" value={formData.paymentType} onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="referenceNumber">
                                <Form.Label>Reference Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter reference number" value={formData.referenceNumber} onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfms">
                                <Form.Label>PFMS</Form.Label>
                                <Form.Control type="text" placeholder="Enter PFMS" value={formData.pfms} onChange={(e) => setFormData({ ...formData, pfms: e.target.value })} />
                            </Form.Group>
                            <Button variant="primary" type="submit">{modalMode === 'add' ? 'Add' : 'Update'}</Button>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Alert show={showAlert} variant="success" onClose={handleCloseAlert} dismissible>
                <Alert.Heading>{alertMessage}</Alert.Heading>
            </Alert>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ATL Code</th>
                        <th>Payment Category</th>
                        <th>Payment Slab</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.atlcode}</td>
                            <td>{payment.paymentCategory}</td>
                            <td>{payment.paymentSlab}</td>
                            <td>{payment.date}</td>
                            <td>{payment.amount}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleOpenEditModal(payment)} style={{ cursor: 'pointer' }} />
                                &nbsp;
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(payment.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                &nbsp;
                                <FontAwesomeIcon icon={faEye} onClick={() => handleOpenViewModal(payment)} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Paymenttable;
