import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SchoolInfoTable from '../EmployeeDashboard/SchoolInfoTable';
import LeadInfoTable from '../EmployeeDashboard/LeadInfoTable';
import 'bootstrap/dist/css/bootstrap.min.css';



function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('SchoolInfoTable');
  const [employeeId, setEmployeeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8801/getEmployeeId?username=${localStorage.getItem('username')}`);
        setEmployeeId(response.data.employeeid);
        setError('');
      } catch (error) {
        console.error('Error fetching employee ID:', error);
        setError('Error fetching employee ID. Please try again later.');
      }
      setLoading(false);
    };

    fetchEmployeeId();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark sidebar d-flex flex-column align-items-center text-white">
          <div className="sidebar-sticky mt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className={`nav-link btn btn-outline-light ${activeTab === 'SchoolInfoTable' && 'active'}`} onClick={() => handleTabChange('SchoolInfoTable')}>
                  School Information
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link btn btn-outline-light ${activeTab === 'LeadInfoTable' && 'active'}`} onClick={() => handleTabChange('LeadInfoTable')}>
                  Lead Information
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Content */}
        <div className="col-md-9 ml-sm-auto col-lg-9 px-4">
          {/* Render content based on activeTab */}
          {loading ? (
            <p className="mt-3">Loading...</p>
          ) : error ? (
            <p className="mt-3 text-danger">{error}</p>
          ) : (
            <>
              {activeTab === 'SchoolInfoTable' && <SchoolInfoTable employeeId={employeeId} />}
              {activeTab === 'LeadInfoTable' && <LeadInfoTable employeeId={employeeId} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
