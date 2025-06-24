import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Alert, Button, Form, Table } from 'react-bootstrap';

function User() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [viewedUser, setViewedUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        phone: '',
        address: '',
        dateofjoining: '',
        atlcode: '',
        employeeid: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
        const response = await axios.get(`${API_BASE_URL}/users`);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                await handleAddUser();
            } else {
                await handleUpdateUser();
            }
            fetchUsers();
            resetFormData();
        } catch (error) {
            console.error('Error adding/updating user:', error);
            setAlertMessage('Error adding/updating user.');
            setShowAlert(true);
        }
    }

    async function handleAddUser() {
        try {
            await axios.post(`${API_BASE_URL}/users`, formData);
            handleCloseModal();
            setAlertMessage('User added successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error adding user:', error);
            setAlertMessage('Error adding user.');
            setShowAlert(true);
        }
    }

    async function handleUpdateUser() {
        try {
            await axios.put(`${API_BASE_URL}/users/${formData.id}`, formData);
            handleCloseModal();
            setAlertMessage('User updated successfully.');
            setShowAlert(true);
        } catch (error) {
            console.error('Error updating user:', error);
            setAlertMessage('Error updating user.');
            setShowAlert(true);
        }
    }

    async function handleDelete(id) {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this user?');
            if (confirmDelete) {
            await axios.delete(`${API_BASE_URL}/users/${id}`);
                fetchUsers();
                setAlertMessage('User deleted successfully.');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            setAlertMessage('Error deleting user.');
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

    function handleOpenEditModal(user) {
        setModalMode('edit');
        setFormData(user);
        setShowModal(true);
    }

    function handleOpenViewModal(user) {
        setModalMode('view');
        setViewedUser(user);
        setShowModal(true);
    }

    function handleCloseAlert() {
        setShowAlert(false);
    }

    function resetFormData() {
        setFormData({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            role: '',
            email: '',
            phone: '',
            address: '',
            dateofjoining: '',
            atlcode: '',
            employeeid: ''
        });
    }

    return (
        <div>
            <Button variant="primary" onClick={handleOpenAddModal}>
                <FontAwesomeIcon icon={faPlus} /> Add User
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMode === 'add' ? 'Add User' : modalMode === 'edit' ? 'Edit User' : 'View User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalMode === 'view' && viewedUser && (
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td><strong>Username</strong></td>
                                    <td>{viewedUser.username}</td>
                                </tr>
                                <tr>
                                    <td><strong>First Name</strong></td>
                                    <td>{viewedUser.firstName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Last Name</strong></td>
                                    <td>{viewedUser.lastName}</td>
                                </tr>
                                <tr>
                                    <td><strong>Role</strong></td>
                                    <td>{viewedUser.role}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email</strong></td>
                                    <td>{viewedUser.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Phone</strong></td>
                                    <td>{viewedUser.phone}</td>
                                </tr>
                                <tr>
                                    <td><strong>Address</strong></td>
                                    <td>{viewedUser.address}</td>
                                </tr>
                                <tr>
                                    <td><strong>Date of Joining</strong></td>
                                    <td>{viewedUser.dateofjoining}</td>
                                </tr>
                                <tr>
                                    <td><strong>ATL Code</strong></td>
                                    <td>{viewedUser.atlcode}</td>
                                </tr>
                                <tr>
                                    <td><strong>Employee ID</strong></td>
                                    <td>{viewedUser.employeeid}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                    {(modalMode === 'add' || modalMode === 'edit') && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Enter role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="dateofjoining">
                                <Form.Label>Date of Joining</Form.Label>
                                <Form.Control type="date" value={formData.dateofjoining} onChange={(e) => setFormData({ ...formData, dateofjoining: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="atlcode">
                                <Form.Label>ATL Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter ATL code" value={formData.atlcode} onChange={(e) => setFormData({ ...formData, atlcode: e.target.value })} />
                            </Form.Group>
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
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleOpenEditModal(user)} style={{ cursor: 'pointer' }} />
                                &nbsp;
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} style={{ cursor: 'pointer', color: 'red' }} />
                                &nbsp;
                                <FontAwesomeIcon icon={faEye} onClick={() => handleOpenViewModal(user)} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default User;
