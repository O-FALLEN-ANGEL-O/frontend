import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Alert, Button, Form, Table } from 'react-bootstrap';

function Schoolinfotable() {
    const [schools, setSchools] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [viewedSchool, setViewedSchool] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        collegeName: '',
        sanctionNo: '',
        udise: '',
        fromDate: '',
        inaugurationDate: '',
        principalName: '',
        atlcode: '',
        dashboardPassword: '',
        gemcode: '',
        gemPassword: '',
        govtEmail: '',
        govtMailPassword: '',
        pfms: '',
        pfmsPassword: '',
        pfmsOP: '',
        pfmsOPPassword: '',
        pfmsAP: '',
        pfmsAPPassword: '',
        altIncharge: '',
        altPhone: '',
        registeredEmail: '',
        registeredPhone: '',
        bharatkosh: '',
        bharatkoshPassword: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchSchools();
    }, []);

    async function fetchSchools() {
        try {
            const response = await axios.get("http://localhost:8801/schoolInfo");
            setSchools(response.data.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                await handleAddSchool();
            } else {
                await handleUpdateSchool();
            }
            fetchSchools();
            resetFormData();
        } catch (error) {
            console.error('Error adding/updating school:', error);
            setAlertMessage('Error adding/updating school.');
            setShowAlert(true);
        }
    }

    async function handleAddSchool() {
        try {
            await axios.post("http://localhost:8801/schoolInfo", formData);
            handleCloseModal();
            setAlertMessage('School added successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error adding school:', error);
            setAlertMessage('Error adding school.');
            setShowAlert(true);
        }
    }

    async function handleUpdateSchool() {
        try {
            await axios.put(`http://localhost:8801/schoolInfo/${formData.id}`, formData);
            handleCloseModal();
            setAlertMessage('School updated successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating school:', error);
            setAlertMessage('Error updating school.');
            setShowAlert(true);
        }
    }

    async function handleDelete(id) {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this school?');
            if (confirmDelete) {
                await axios.delete(`http://localhost:8801/schoolInfo/${id}`);
                fetchSchools();
                setAlertMessage('School deleted successfully.');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error deleting school:', error);
            setAlertMessage('Error deleting school.');
            setShowAlert(true);
        }
    }

    function handleCloseModal() {
        setShowModal(false);
        setFormData({
            id: null,
            collegeName: '',
            sanctionNo: '',
            udise: '',
            fromDate: '',
            inaugurationDate: '',
            principalName: '',
            atlcode: '',
            dashboardPassword: '',
            gemcode: '',
            gemPassword: '',
            govtEmail: '',
            govtMailPassword: '',
            pfms: '',
            pfmsPassword: '',
            pfmsOP: '',
            pfmsOPPassword: '',
            pfmsAP: '',
            pfmsAPPassword: '',
            altIncharge: '',
            altPhone: '',
            registeredEmail: '',
            registeredPhone: '',
            bharatkosh: '',
            bharatkoshPassword: ''
        });
    }

    function handleOpenAddModal() {
        setModalMode('add');
        setShowModal(true);
    }

    function handleOpenEditModal(school) {
        setModalMode('edit');
        setFormData(school);
        setShowModal(true);
    }

    function handleOpenViewModal(school) {
        setModalMode('view');
        setViewedSchool(school);
        setShowModal(true);
    }

    function handleCloseAlert() {
        setShowAlert(false);
    }

    function resetFormData() {
        setFormData({
            id: null,
            collegeName: '',
            sanctionNo: '',
            udise: '',
            fromDate: '',
            inaugurationDate: '',
            principalName: '',
            atlcode: '',
            dashboardPassword: '',
            gemcode: '',
            gemPassword: '',
            govtEmail: '',
            govtMailPassword: '',
            pfms: '',
            pfmsPassword: '',
            pfmsOP: '',
            pfmsOPPassword: '',
            pfmsAP: '',
            pfmsAPPassword: '',
            altIncharge: '',
            altPhone: '',
            registeredEmail: '',
            registeredPhone: '',
            bharatkosh: '',
            bharatkoshPassword: ''
        });
    }

    return (
        <div>
            <Button variant="primary" onClick={handleOpenAddModal}>
                <FontAwesomeIcon icon={faPlus} /> Add School
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'add' ? 'Add School' : modalMode === 'edit' ? 'Edit School' : 'View School'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalMode === 'view' && viewedSchool && (
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td><strong>College Name</strong></td>
                                    <td>{viewedSchool.collegeName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Sanction No</strong></td>
                                    <td>{viewedSchool.sanctionNo}</td>
                                </tr>
                                <tr>
                                    <td><strong>UDISE</strong></td>
                                    <td>{viewedSchool.udise}</td>
                                </tr>
                                <tr>
                                    <td><strong>From Date</strong></td>
                                    <td>{viewedSchool.fromDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Inauguration Date</strong></td>
                                    <td>{viewedSchool.inaugurationDate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Principal Name</strong></td>
                                    <td>{viewedSchool.principalName}</td>
                                </tr>
                                <tr>
                                    <td><strong>ATL Code</strong></td>
                                    <td>{viewedSchool.atlcode}</td>
                                </tr>
                                <tr>
                                    <td><strong>Dashboard Password</strong></td>
                                    <td>{viewedSchool.dashboardPassword}</td>
                                </tr>
                                <tr>
                                    <td><strong>GEM Code</strong></td>
                                    <td>{viewedSchool.gemcode}</td>
                                </tr>
                                <tr>
                                    <td><strong>GEM Password</strong></td>
                                    <td>{viewedSchool.gemPassword}</td>
                                </tr>
                                <tr>
                                    <td><strong>Government Email</strong></td>
                                    <td>{viewedSchool.govtEmail}</td>
                                </tr>
                                <tr>
                                    <td><strong>Government Mail Password</strong></td>
                                    <td>{viewedSchool.govtMailPassword}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS</strong></td>
                                    <td>{viewedSchool.pfms}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS Password</strong></td>
                                    <td>{viewedSchool.pfmsPassword}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS OP</strong></td>
                                    <td>{viewedSchool.pfmsOP}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS OP Password</strong></td>
                                    <td>{viewedSchool.pfmsOPPassword}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS AP</strong></td>
                                    <td>{viewedSchool.pfmsAP}</td>
                                </tr>
                                <tr>
                                    <td><strong>PFMS AP Password</strong></td>
                                    <td>{viewedSchool.pfmsAPPassword}</td>
                                </tr>
                                <tr>
                                    <td><strong>ALT Incharge</strong></td>
                                    <td>{viewedSchool.altIncharge}</td>
                                </tr>
                                <tr>
                                    <td><strong>ALT Phone</strong></td>
                                    <td>{viewedSchool.altPhone}</td>
                                </tr>
                                <tr>
                                    <td><strong>Registered Email</strong></td>
                                    <td>{viewedSchool.registeredEmail}</td>
                                </tr>
                                <tr>
                                    <td><strong>Registered Phone</strong></td>
                                    <td>{viewedSchool.registeredPhone}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bharatkosh</strong></td>
                                    <td>{viewedSchool.bharatkosh}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bharatkosh Password</strong></td>
                                    <td>{viewedSchool.bharatkoshPassword}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                    {(modalMode === 'add' || modalMode === 'edit') && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="collegeName">
                                <Form.Label>College Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter college name" value={formData.collegeName} onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="sanctionNo">
                                <Form.Label>Sanction No</Form.Label>
                                <Form.Control type="text" placeholder="Enter sanction number" value={formData.sanctionNo} onChange={(e) => setFormData({ ...formData, sanctionNo: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="udise">
                                <Form.Label>UDISE</Form.Label>
                                <Form.Control type="text" placeholder="Enter UDISE" value={formData.udise} onChange={(e) => setFormData({ ...formData, udise: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="fromDate">
                                <Form.Label>From Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter from date" value={formData.fromDate} onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="inaugurationDate">
                                <Form.Label>Inauguration Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter inauguration date" value={formData.inaugurationDate} onChange={(e) => setFormData({ ...formData, inaugurationDate: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="principalName">
                                <Form.Label>Principal Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter principal name" value={formData.principalName} onChange={(e) => setFormData({ ...formData, principalName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="atlcode">
                                <Form.Label>ATL Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter ATL code" value={formData.atlcode} onChange={(e) => setFormData({ ...formData, atlcode: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="dashboardPassword">
                                <Form.Label>Dashboard Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter dashboard password" value={formData.dashboardPassword} onChange={(e) => setFormData({ ...formData, dashboardPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="gemcode">
                                <Form.Label>GEM Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter GEM code" value={formData.gemcode} onChange={(e) => setFormData({ ...formData, gemcode: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="gemPassword">
                                <Form.Label>GEM Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter GEM password" value={formData.gemPassword} onChange={(e) => setFormData({ ...formData, gemPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="govtEmail">
                                <Form.Label>Government Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter government email" value={formData.govtEmail} onChange={(e) => setFormData({ ...formData, govtEmail: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="govtMailPassword">
                                <Form.Label>Government Mail Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter government mail password" value={formData.govtMailPassword} onChange={(e) => setFormData({ ...formData, govtMailPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfms">
                                <Form.Label>PFMS</Form.Label>
                                <Form.Control type="text" placeholder="Enter PFMS" value={formData.pfms} onChange={(e) => setFormData({ ...formData, pfms: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfmsPassword">
                                <
                                    Form.Label>PFMS Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter PFMS password" value={formData.pfmsPassword} onChange={(e) => setFormData({ ...formData, pfmsPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfmsOP">
                                <Form.Label>PFMS OP</Form.Label>
                                <Form.Control type="text" placeholder="Enter PFMS OP" value={formData.pfmsOP} onChange={(e) => setFormData({ ...formData, pfmsOP: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfmsOPPassword">
                                <Form.Label>PFMS OP Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter PFMS OP password" value={formData.pfmsOPPassword} onChange={(e) => setFormData({ ...formData, pfmsOPPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfmsAP">
                                <Form.Label>PFMS AP</Form.Label>
                                <Form.Control type="text" placeholder="Enter PFMS AP" value={formData.pfmsAP} onChange={(e) => setFormData({ ...formData, pfmsAP: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="pfmsAPPassword">
                                <Form.Label>PFMS AP Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter PFMS AP password" value={formData.pfmsAPPassword} onChange={(e) => setFormData({ ...formData, pfmsAPPassword: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="altIncharge">
                                <Form.Label>ALT Incharge</Form.Label>
                                <Form.Control type="text" placeholder="Enter ALT incharge" value={formData.altIncharge} onChange={(e) => setFormData({ ...formData, altIncharge: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="altPhone">
                                <Form.Label>ALT Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Enter ALT phone" value={formData.altPhone} onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="registeredEmail">
                                <Form.Label>Registered Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter registered email" value={formData.registeredEmail} onChange={(e) => setFormData({ ...formData, registeredEmail: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="registeredPhone">
                                <Form.Label>Registered Phone</Form.Label>
                                <Form.Control type="tel" placeholder="Enter registered phone" value={formData.registeredPhone} onChange={(e) => setFormData({ ...formData, registeredPhone: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="bharatkosh">
                                <Form.Label>Bharatkosh</Form.Label>
                                <Form.Control type="text" placeholder="Enter Bharatkosh" value={formData.bharatkosh} onChange={(e) => setFormData({ ...formData, bharatkosh: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="bharatkoshPassword">
                                <Form.Label>Bharatkosh Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Bharatkosh password" value={formData.bharatkoshPassword} onChange={(e) => setFormData({ ...formData, bharatkoshPassword: e.target.value })} />
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
                        <th>ID</th>
                        <th>College Name</th>
                        <th>Principal Name</th>
                        <th>ATL Code</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {schools.map((school) => (
                        <tr key={school.id}>
                            <td>{school.id}</td>
                            <td>{school.collegeName}</td>
                            <td>{school.principalName}</td>
                            <td>{school.atlcode}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleOpenEditModal(school)} style={{ cursor: 'pointer' }} />
                                &nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(school.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                &nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon icon={faEye} onClick={() => handleOpenViewModal(school)} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    );
}

export default Schoolinfotable;
