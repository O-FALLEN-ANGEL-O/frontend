import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton, Modal, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import logo from "../../../assest/Image/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton, Modal, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import logo from "../../../assest/Image/logo.png";

function ProfilePopup({ username, userRole, profilePicture, onClose }) {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Profile Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                        <div className="col">
                            <h5>Username:</h5>
                            <p>{username}</p>
                            <h5>User Role:</h5>
                            <p>{userRole}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [userRole, setUserRole] = useState('user');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupRole, setSignupRole] = useState('user');
    const [atlCode, setAtlCode] = useState('');
    const navigate = useNavigate();
    const navbarRef = useRef(null);

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('loggedIn');
        if (storedLoggedIn === 'true') {
            setLoggedIn(true);
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
            const storedUserRole = localStorage.getItem('userRole');
            setUserRole(storedUserRole || 'user');
            const storedProfilePictureURL = localStorage.getItem('profilePictureURL');
            setProfilePictureURL(storedProfilePictureURL || '');
        }
    }, []);

    const handleOutsideClick = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setShowMenu(false); // Close the navbar collapse if click is outside
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8801'}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const { role, profilePictureURL } = await response.json();
                setUsername(username);
                setUserRole(role);
                setLoggedIn(true);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userRole', role);
                localStorage.setItem('profilePictureURL', profilePictureURL);
                setProfilePictureURL(profilePictureURL);
                setShowLoginModal(false);
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to login. Please try again later.');
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8801'}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: signupUsername, password: signupPassword, role: signupRole, atlCode })
            });
            if (response.ok) {
                // Signup successful, proceed with login
                await handleLogin();
            } else {
                const { message } = await response.json();
                setError(message || 'Failed to register. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to register. Please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUsername('');
        setPassword('');
        setUserRole('user');
        setLoggedIn(false);
        setProfilePictureURL('');
        setShowProfileModal(false);
        navigate('/');
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
        setError('');
    };

    const handleSignupModalClose = () => {
        setShowSignupModal(false);
        setError('');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" ref={navbarRef}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={logo} alt="Logo" /></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FaBars /> {/* Font Awesome bars icon */}
                </button>
                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to="/service1">Service 1</Link></li>
                                <li><Link className="dropdown-item" to="/service2">Service 2</Link></li>
                                <li><Link className="dropdown-item" to="/service3">Service 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {loggedIn ? (
                            <DropdownButton id="dropdown-basic-button" title={username}>
                                {userRole === 'admin' && (
                                    <>
                                        <Dropdown.Item as={Link} to="/AdminDashboard">Admin Dashboard</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/InvoiceMainPage">Invoice</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/AtlForm">ATL Class Form</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/leadform">Lead Form</Dropdown.Item>


                                    </>
                                )}
                                {userRole === 'employee' && (
                                    <>
                                        <Dropdown.Item as={Link} to="/EmployeeDashboard">Employee Dashboard</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/AtlForm">ATL Class Form</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/leadform">Lead Form</Dropdown.Item>
                                    </>
                                )}
                                {userRole === 'school' && (
                                    <>
                                        <Dropdown.Item as={Link} to="/SchoolDashboard">School Dashboard</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/atlForm">ATL Class Form</Dropdown.Item>

                                    </>
                                )}
                                <Dropdown.Item onClick={() => setShowProfileModal(true)}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </DropdownButton>
                        ) : (
                            <li className="nav-item">
                                <Button variant="outline-success" onClick={() => setShowLoginModal(true)}>Login</Button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <Modal show={showLoginModal} onHide={handleLoginModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>Username</label>
                            <input type='text' className='form-control rounded-0' placeholder='Enter Username' value={username}<edit_file>
<path>frontend/src/components/home/navbar/Navbar.js</path>
<content>
<<<<<<< SEARCH
import "./Navbar.css";

function ProfilePopup({ username, userRole, profilePicture, onClose }) {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Profile Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img src={profilePicture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                        <div className="col">
                            <h5>Username:</h5>
                            <p>{username}</p>
                            <h5>User Role:</h5>
                            <p>{userRole}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [userRole, setUserRole] = useState('user');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupRole, setSignupRole] = useState('user');
    const [atlCode, setAtlCode] = useState('');
    const navigate = useNavigate();
    const navbarRef = useRef(null);

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('loggedIn');
        if (storedLoggedIn === 'true') {
            setLoggedIn(true);
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
            const storedUserRole = localStorage.getItem('userRole');
            setUserRole(storedUserRole || 'user');
            const storedProfilePictureURL = localStorage.getItem('profilePictureURL');
            setProfilePictureURL(storedProfilePictureURL || '');
        }
    }, []);

    const handleOutsideClick = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setShowMenu(false); // Close the navbar collapse if click is outside
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8801/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const { role, profilePictureURL } = await response.json();
                setUsername(username);
                setUserRole(role);
                setLoggedIn(true);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userRole', role);
                localStorage.setItem('profilePictureURL', profilePictureURL);
                setProfilePictureURL(profilePictureURL);
                setShowLoginModal(false);
                navigate('/');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to login. Please try again later.');
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:8801/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: signupUsername, password: signupPassword, role: signupRole, atlCode })
            });
            if (response.ok) {
                // Signup successful, proceed with login
                await handleLogin();
            } else {
                const { message } = await response.json();
                setError(message || 'Failed to register. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to register. Please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUsername('');
        setPassword('');
        setUserRole('user');
        setLoggedIn(false);
        setProfilePictureURL('');
        setShowProfileModal(false);
        navigate('/');
    };

    const handleLoginModalClose = () => {
        setShowLoginModal(false);
        setError('');
    };

    const handleSignupModalClose = () => {
        setShowSignupModal(false);
        setError('');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" ref={navbarRef}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={logo} alt="Logo" /></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <FaBars /> {/* Font Awesome bars icon */}
                </button>
                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><Link className="dropdown-item" to="/service1">Service 1</Link></li>
                                <li><Link className="dropdown-item" to="/service2">Service 2</Link></li>
                                <li><Link className="dropdown-item" to="/service3">Service 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {loggedIn ? (
                            <DropdownButton id="dropdown-basic-button" title={username}>
                                {userRole === 'admin' && (
                                    <>
                                        <Dropdown.Item as={Link} to="/AdminDashboard">Admin Dashboard</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/InvoiceMainPage">Invoice</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/AtlForm">ATL Class Form</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/leadform">Lead Form</Dropdown.Item>


                                    </>
                                )}
                                {userRole === 'employee' && (
                                    <>
                                        <Dropdown.Item as={Link} to="/EmployeeDashboard">Employee Dashboard</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/AtlForm">ATL Class Form</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/leadform">Lead Form</Dropdown.Item>
                                    </>
                                )}
                                {userRole === 'school' && (
                                    <>
                                        <Dropdown.Item as={Link} to="/SchoolDashboard">School Dashboard</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/atlForm">ATL Class Form</Dropdown.Item>

                                    </>
                                )}
                                <Dropdown.Item onClick={() => setShowProfileModal(true)}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </DropdownButton>
                        ) : (
                            <li className="nav-item">
                                <Button variant="outline-success" onClick={() => setShowLoginModal(true)}>Login</Button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <Modal show={showLoginModal} onHide={handleLoginModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>Username</label>
                            <input type='text' className='form-control rounded-0' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error && <div className="text-danger">{error}</div>}
                        <Button type='submit' className='btn btn-success w-100'>Log In</Button>
                        <div className="mt-3 text-center">
                            <p>Don't have an account? <Button variant="link" onClick={() => { setShowLoginModal(false); setShowSignupModal(true); }}>Sign Up</Button></p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showSignupModal} onHide={handleSignupModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                        <div className='mb-3'>
                            <label htmlFor='signupUsername' className='form-label'>Username</label>
                            <input type='text' placeholder='Enter Username' className='form-control rounded-0' onChange={(e) => setSignupUsername(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='signupPassword' className='form-label'>Password</label>
                            <input type='password' placeholder='Enter Password' className='form-control rounded-0' onChange={(e) => setSignupPassword(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='signupRole' className='form-label'>Role</label>
                            <select className='form-select rounded-0' value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
                                <option value='user'>User</option>
                                <option value='school'>School</option>
                            </select>
                        </div>
                        {signupRole === 'school' && (
                            <div className='mb-3'>
                                <label htmlFor='atlCode' className='form-label'>ATL Code</label>
                                <input type='text' placeholder='Enter ATL Code' className='form-control rounded-0' onChange={(e) => setAtlCode(e.target.value)} />
                            </div>
                        )}
                        {error && <div className="text-danger">{error}</div>}
                        <Button type='submit' className='btn btn-primary w-100'>Sign Up</Button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>Already have an account? <Button variant="link" onClick={() => { setShowSignupModal(false); setShowLoginModal(true); }}>Log In</Button></p>
                    </div>
                </Modal.Body>
            </Modal>
        </nav>
    );
}

export default Navbar;
=======
import "./Navbar.css";

function Navbar() {
  // Redesigned Navbar component with updated styles and structure
  // Implementation will follow the approved color scheme and UX plan
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/service1">
                    Service 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/service2">
                    Service 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/service3">
                    Service 3
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

