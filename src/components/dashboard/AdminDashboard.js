import React, { useState } from 'react';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import '../../css/AdminDashboard.css'; // Import custom CSS for styling

import User from '../Table/User';
import Paymenttable from '../Table/Paymenttable';
import SchoolInfoTable from '../Table/Schoolinfotable';
import Employee from '../Table/Employee';
import School from '../Table/School';
import LeadTable from '../Table/Leadtable';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('user');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark sidebar text-white">
          <div className="sidebar-sticky">
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link className={`btn btn-link ${activeTab === 'Manage Employees' && 'active'}`} onClick={() => handleTabChange('Manage Employees')}>
                  Manage Employees
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`btn btn-link ${activeTab === 'Manage Schools' && 'active'}`} onClick={() => handleTabChange('Manage Schools')}>
                  Manage Schools
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`btn btn-link ${activeTab === 'user' && 'active'}`} onClick={() => handleTabChange('user')}>
                  Users
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`btn btn-link ${activeTab === 'SchoolInfoTable' && 'active'}`} onClick={() => handleTabChange('SchoolInfoTable')}>
                  School Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`btn btn-link ${activeTab === 'LeadInfo' && 'active'}`} onClick={() => handleTabChange('LeadInfo')}>
                  Lead Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={`btn btn-link ${activeTab === 'PaymentTable' && 'active'}`} onClick={() => handleTabChange('PaymentTable')}>
                  Payment Table
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        {/* Content */}
        <div className="col-md-9 col-lg-9 px-4">
          <Tab.Container activeKey={activeTab}>
            <Row>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="Manage Employees">
                    <Employee />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Manage Schools">
                    <School />
                  </Tab.Pane>
                  <Tab.Pane eventKey="user">
                    <User />
                  </Tab.Pane>
                  <Tab.Pane eventKey="SchoolInfoTable">
                    <SchoolInfoTable />
                  </Tab.Pane>
                  <Tab.Pane eventKey="LeadInfo">
                    <LeadTable />
                  </Tab.Pane>
                  <Tab.Pane eventKey="PaymentTable">
                    <Paymenttable />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
