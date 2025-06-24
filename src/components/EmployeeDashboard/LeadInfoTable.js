import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Alert, Button, Form, Table } from 'react-bootstrap';

function LeadInfoTable() {
    const [leads, setLeads] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [viewedLead, setViewedLead] = useState(null);
    const [formData, setFormData] = useState({
        school_board: '',
        lead_source: '',
        pin_code: '',
        organization_name: '',
        address: '',
        in_group: '',
        state: '',
        city: '',
        full_name: '',
        landline_number: '',
        email: '',
        designation: '',
        phone_number: '',
        no_students: 0,
        expected_close_date: '',
        attachment_path: '',
        employeeid: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [employeeId, setEmployeeId] = useState(null);

    useEffect(() => {
        fetchEmployeeId();
    }, []);

    useEffect(() => {
        if (employeeId) {
            fetchLeads();
        }
    }, [employeeId]);

    async function fetchEmployeeId() {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get(`http://localhost:8801/getEmployeeId?username=${username}`);
            setEmployeeId(response.data.employeeid);
        } catch (error) {
            console.error('Error fetching employee ID:', error);
            setAlertMessage('Error fetching employee ID. Please try again later.');
            setShowAlert(true);
        }
    }

    async function fetchLeads() {
        try {
            const response = await axios.get(`http://localhost:8801/empdashboard/leadInfo/${employeeId}`);
            setLeads(response.data.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
            setAlertMessage('Error fetching leads.');
            setShowAlert(true);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formDataKeys = Object.keys(formData);

        try {
            if (modalMode === 'add') {
                const requiredFieldsMissing = formDataKeys.some((key) => {
                    return formData[key] === '' && isFieldRequired(key);
                });

                if (requiredFieldsMissing) {
                    setAlertMessage('Please fill out all required fields.');
                    setShowAlert(true);
                    return;
                }

                await handleAddLead();
            } else {
                await handleUpdateLead();
            }

            fetchLeads();
            resetFormData();
        } catch (error) {
            console.error('Error adding/updating lead:', error);
            setAlertMessage('Error adding/updating lead.');
            setShowAlert(true);
        }
    }

    function isFieldRequired(fieldName) {
        const requiredFields = ['school_board', 'lead_source', 'organization_name', 'state', 'city', 'full_name'];
        return requiredFields.includes(fieldName);
    }

    async function handleAddLead() {
        try {
            const leadData = {
                ...formData,
                employeeid: employeeId
            };

            await axios.post("http://localhost:8801/leadInfo", leadData);
            handleCloseModal();
            setAlertMessage('Lead added successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error adding lead:', error);
            setAlertMessage('Error adding lead.');
            setShowAlert(true);
        }
    }

    async function handleUpdateLead() {
        try {
            await axios.put(`http://localhost:8801/leadInfo/${formData.id}`, formData);
            handleCloseModal();
            setAlertMessage('Lead updated successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating lead:', error);
            setAlertMessage('Error updating lead.');
            setShowAlert(true);
        }
    }

    async function handleDelete(id) {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this lead?');
            if (confirmDelete) {
                await axios.delete(`http://localhost:8801/leadInfo/${id}`);
                fetchLeads();
                setAlertMessage('Lead deleted successfully.');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error deleting lead:', error);
            setAlertMessage('Error deleting lead.');
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

    function handleOpenEditModal(lead) {
        setModalMode('edit');
        setFormData(lead);
        setShowModal(true);
    }

    function handleOpenViewModal(lead) {
        setModalMode('view');
        setViewedLead(lead);
        setShowModal(true);
    }

    function handleCloseAlert() {
        setShowAlert(false);
    }

    function resetFormData() {
        setFormData({
            school_board: '',
            lead_source: '',
            pin_code: '',
            organization_name: '',
            address: '',
            in_group: '',
            state: '',
            city: '',
            full_name: '',
            landline_number: '',
            email: '',
            designation: '',
            phone_number: '',
            no_students: 0,
            expected_close_date: '',
            attachment_path: '',
            employeeid: ''
        });
    }

    return (
        <div>
            <Button variant="primary" onClick={handleOpenAddModal}>
                <FontAwesomeIcon icon={faPlus} /> Add Lead
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'add' ? 'Add Lead' : modalMode === 'edit' ? 'Edit Lead' : 'View Lead'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalMode === 'view' && viewedLead && (
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td><strong>School Board</strong></td>
                                    <td>{viewedLead.school_board}</td>
                                </tr>
                                <tr>
                                    <td><strong>Lead Source</strong></td>
                                    <td>{viewedLead.lead_source}</td>
                                </tr>
                                <tr>
                                    <td><strong>Pin Code</strong></td>
                                    <td>{viewedLead.pin_code}</td>
                                </tr>
                                <tr>
                                    <td><strong>Organization Name</strong></td>
                                    <td>{viewedLead.organization_name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address</strong></td>
                                    <td>{viewedLead.address}</td>
                                </tr>
                                <tr>
                                    <td><strong>In Group</strong></td>
                                    <td>{viewedLead.in_group}</td>
                                </tr>
                                <tr>
                                    <td><strong>State</strong></td>
                                    <td>{viewedLead.state}</td>
                                </tr>
                                <tr>
                                    <td><strong>City</strong></td>
                                    <td>{viewedLead.city}</td>
                                </tr>
                                <tr>
                                    <td><strong>Full Name</strong></td>
                                    <td>{viewedLead.full_name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Landline Number</strong></td>
                                    <td>{viewedLead.landline_number}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{viewedLead.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Designation</strong></td>
                                    <td>{viewedLead.designation}</td>
                                </tr>
                                <tr>
                                    <td><strong>Phone Number</strong></td>
                                    <td>{viewedLead.phone_number}</td>
                                </tr>
                                <tr>
                                    <td><strong>No. of Students</strong></td>
                                    <td>{viewedLead.no_students}</td>
                                </tr>
                                <tr>
                                    <td><strong>Expected Close Date</strong></td>
                                    <td>{viewedLead.expected_close_date}</td>
                                </tr>
                                <tr>
                                    <td><strong>Attachment Path</strong></td>
                                    <td>{viewedLead.attachment_path}</td>
                                </tr>
                                <tr>
                                    <td><strong>Employee ID</strong></td>
                                    <td>{viewedLead.employeeid}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                    {(modalMode === 'add' || modalMode === 'edit') && (
                        <Form onSubmit={handleSubmit}>
                            {/* Form fields */}
                            {/* School Board */}
                            <Form.Group controlId="school_board">
                                <Form.Label>School Board</Form.Label>
                                <Form.Control type="text" placeholder="Enter school board" value={formData.school_board} onChange={(e) => setFormData({ ...formData, school_board: e.target.value })} />
                            </Form.Group>
                            {/* Lead Source */}
                            <Form.Group controlId="lead_source">
                                <Form.Label>Lead Source</Form.Label>
                                <Form.Control type="text" placeholder="Enter lead source" value={formData.lead_source} onChange={(e) => setFormData({ ...formData, lead_source: e.target.value })} />
                            </Form.Group>
                            {/* Pin Code */}
                            <Form.Group controlId="pin_code">
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter pin code" value={formData.pin_code} onChange={(e) => setFormData({ ...formData, pin_code: e.target.value })} />
                            </Form.Group>
                            {/* Organization Name */}
                            <Form.Group controlId="organization_name">
                                <Form.Label>Organization Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter organization name" value={formData.organization_name} onChange={(e) => setFormData({ ...formData, organization_name: e.target.value })} />
                            </Form.Group>
                            {/* Address */}
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </Form.Group>
                            {/* In Group */}
                            <Form.Group controlId="in_group">
                                <Form.Label>In Group</Form.Label>
                                <Form.Control type="text" placeholder="Enter in group" value={formData.in_group} onChange={(e) => setFormData({ ...formData, in_group: e.target.value })} />
                            </Form.Group>
                            {/* State */}
                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="Enter state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                            </Form.Group>
                            {/* City */}
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                            </Form.Group>
                            {/* Full Name */}
                            <Form.Group controlId="full_name">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                            </Form.Group>
                            {/* Landline Number */}
                            <Form.Group controlId="landline_number">
                                <Form.Label>Landline Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter landline number" value={formData.landline_number} onChange={(e) => setFormData({ ...formData, landline_number: e.target.value })} />
                            </Form.Group>
                            {/* Email */}
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </Form.Group>
                            {/* Designation */}
                            <Form.Group controlId="designation">
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text" placeholder="Enter designation" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
                            </Form.Group>
                            {/* Phone Number */}
                            <Form.Group controlId="phone_number">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone number" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} />
                            </Form.Group>
                            {/* No. of Students */}
                            <Form.Group controlId="no_students">
                                <Form.Label>No. of Students</Form.Label>
                                <Form.Control type="number" placeholder="Enter number of students" value={formData.no_students} onChange={(e) => setFormData({ ...formData, no_students: e.target.value })} />
                            </Form.Group>
                            {/* Expected Close Date */}
                            <Form.Group controlId="expected_close_date">
                                <Form.Label>Expected Close Date</Form.Label>
                                <Form.Control type="text" placeholder="Enter expected close date" value={formData.expected_close_date} onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })} />
                            </Form.Group>
                            {/* Attachment Path */}
                            <Form.Group controlId="attachment_path">
                                <Form.Label>Attachment Path</Form.Label>
                                <Form.Control type="text" placeholder="Enter attachment path" value={formData.attachment_path} onChange={(e) => setFormData({ ...formData, attachment_path: e.target.value })} />
                            </Form.Group>
                            {/* Employee ID */}
                            <Form.Group controlId="employeeid">
                                <Form.Label>Employee ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter employee ID" value={formData.employeeid} onChange={(e) => setFormData({ ...formData, employeeid: e.target.value })} />
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

            <Table striped bordered hover className='mt-4'>
                <thead>
                    <tr>
                        <th>Organization Name</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Contact Person</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>No. of Students</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.organization_name}</td>
                            <td>{lead.city}</td>
                            <td>{lead.state}</td>
                            <td>{lead.full_name}</td>
                            <td>{lead.phone_number}</td>
                            <td>{lead.email}</td>
                            <td>{lead.no_students}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleOpenEditModal(lead)} style={{ cursor: 'pointer' }} />
                                &nbsp;
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(lead.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                &nbsp;
                                <FontAwesomeIcon icon={faEye} onClick={() => handleOpenViewModal(lead)} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default LeadInfoTable;
