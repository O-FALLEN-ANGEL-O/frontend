import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../../cssSchoolInfo.css'; 

const CollegeInfoForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior (for demonstration)
        // Implement form submission logic here
    };

    return (
        <Container className="form-container">
            <Form onSubmit={handleSubmit} className="form">
                <div className="top">
                    <center>
                        <img src="/vitvara1/src/logo.png" alt="logo" className="logo" />
                    </center>
                    <br />
                    <hr />
                </div>
                <br />
                <Form.Group controlId="collegeName">
                    <Form.Label>College Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter college name" required />
                </Form.Group>

                <Form.Group controlId="sanctionNo">
                    <Form.Label>Sanction No</Form.Label>
                    <Form.Control type="text" placeholder="Enter sanction no" required />
                </Form.Group>

                <Form.Group controlId="udise">
                    <Form.Label>UDISE</Form.Label>
                    <Form.Control type="text" placeholder="Enter UDISE" required />
                </Form.Group>

                <Form.Group controlId="fromDate">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control type="date" required />
                </Form.Group>

                <Form.Group controlId="inaugurationDate">
                    <Form.Label>Inauguration Date</Form.Label>
                    <Form.Control type="date" required />
                </Form.Group>

                <Form.Group controlId="principalName">
                    <Form.Label>Principal Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Principal name" required />
                </Form.Group>

                <Form.Group controlId="atlcode">
                    <Form.Label>ATL Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter ATL Code" required />
                </Form.Group>

                <Form.Group controlId="dashboardPassword">
                    <Form.Label>Dashboard Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Dashboard Password" required />
                </Form.Group>

                <Form.Group controlId="gemcode">
                    <Form.Label>GEM Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter GEM Code" required />
                </Form.Group>

                <Form.Group controlId="gemPassword">
                    <Form.Label>GEM Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter GEM Password" required />
                </Form.Group>

                <Form.Group controlId="govtEmail">
                    <Form.Label>Government Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Government Email" required />
                </Form.Group>

                <Form.Group controlId="govtMailPassword">
                    <Form.Label>Government Mail Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Government Mail Password" required />
                </Form.Group>

                <Form.Group controlId="pfms">
                    <Form.Label>PFMS</Form.Label>
                    <Form.Control type="text" placeholder="Enter PFMS" required />
                </Form.Group>

                <Form.Group controlId="pfmsPassword">
                    <Form.Label>PFMS Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter PFMS Password" required />
                </Form.Group>

                <Form.Group controlId="pfmsOP">
                    <Form.Label>PFMS OP</Form.Label>
                    <Form.Control type="text" placeholder="Enter PFMS OP" required />
                </Form.Group>

                <Form.Group controlId="pfmsOPPassword">
                    <Form.Label>PFMS OP Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter PFMS OP Password" required />
                </Form.Group>

                <Form.Group controlId="pfmsAP">
                    <Form.Label>PFMS AP</Form.Label>
                    <Form.Control type="text" placeholder="Enter PFMS AP" required />
                </Form.Group>

                <Form.Group controlId="pfmsAPPassword">
                    <Form.Label>PFMS AP Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter PFMS AP Password" required />
                </Form.Group>

                <Form.Group controlId="altIncharge">
                    <Form.Label>ALT Incharge</Form.Label>
                    <Form.Control type="text" placeholder="Enter ALT Incharge" required />
                </Form.Group>

                <Form.Group controlId="altPhone">
                    <Form.Label>ALT Phone No</Form.Label>
                    <Form.Control type="text" placeholder="Enter ALT Phone No" required />
                </Form.Group>

                <Form.Group controlId="registeredEmail">
                    <Form.Label>Registered Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Registered Email" required />
                </Form.Group>

                <Form.Group controlId="registeredPhone">
                    <Form.Label>Registered Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter Registered Phone" required />
                </Form.Group>

                <Form.Group controlId="bharatkosh">
                    <Form.Label>Bharatkosh</Form.Label>
                    <Form.Control type="text" placeholder="Enter Bharatkosh" required />
                </Form.Group>

                <Form.Group controlId="bharatkoshPassword">
                    <Form.Label>Bharatkosh Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Bharatkosh Password" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit">
                    Submit
                </Button>
                <Button variant="light" href="/home" className="home">
                    Home
                </Button>
            </Form>
        </Container>
    );
};

export default CollegeInfoForm;
