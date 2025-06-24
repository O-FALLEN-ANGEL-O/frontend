import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from './components/home/navbar/Navbar';
import Home from './components/home/Home/Home';
import Portfolio from './components/home/Portfolio/Portfolio';
import Services from './components/home/Services/Services';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/home/About/About';
import Location from './components/home/Location/Location';
import Footer from './components/home/footer/Footer';
import Gallery from './components/home/Gallery/Gallery';
import AdminDashboard from './components/dashboard/AdminDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import SchoolDashboard from './components/dashboard/SchoolDashboard';
import InvoiceGenerator from './components/dashboard/InvoiceGenerator';
import InvoiceDetails from './components/dashboard/InvoiceDetails';
import InvoiceMainPage from './components/dashboard/InvoiceMainPage';
import AtlForm from './components/forms/atlclass/atlclassform';
import LeadForm from './components/forms/Leadform/leadform';

function App() {
  // State to manage logged-in username
  const [loggedInUsername, setLoggedInUsername] = useState('');

  // Function to set logged-in username
  const handleLogin = (username) => {
    setLoggedInUsername(username);
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedInUsername('');
  };

  return (
    <Router>
      <div className="App">
        {/* Pass logged-in username and login/logout handlers to Navbar */}
        <Navbar loggedInUsername={loggedInUsername} onLogin={handleLogin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<AllComponents />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/SchoolDashboard" element={<SchoolDashboard />} />
          <Route path="/InvoiceGenerator" element={<InvoiceGenerator />} />
          <Route path="/invoiceDetails/:id" element={<InvoiceDetails />} />
          <Route path="InvoiceMainPage" element={<InvoiceMainPage />} />
          <Route path="/AtlForm" element={<AtlForm />} />
          <Route path="/leadForm" element={<LeadForm />} />


        </Routes>
        <br />
        <Footer />
      </div>
    </Router>
  );
}

function AllComponents() {
  return (
    <>
      <Home />
      <Portfolio />
      <Services />
      <About />
      <Location />
      <br />
      <Gallery />
      <br />
    </>
  );
}

export default App;
