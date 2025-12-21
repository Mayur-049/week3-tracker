import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ activeSection, setActiveSection, user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-5" href="#home" onClick={(e) => { e.preventDefault(); setActiveSection('home'); }}>
          Expense Tracker- Mayur Devendrabhai patel
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${activeSection === 'home' ? 'active text-white' : 'text-secondary'}`}
                onClick={() => setActiveSection('home')}
                style={{ cursor: 'pointer' }}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${activeSection === 'about' ? 'active text-white' : 'text-secondary'}`}
                onClick={() => setActiveSection('about')}
                style={{ cursor: 'pointer' }}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${activeSection === 'products' ? 'active text-white' : 'text-secondary'}`}
                onClick={() => setActiveSection('products')}
                style={{ cursor: 'pointer' }}
              >
                Products
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${activeSection === 'project' ? 'active text-white' : 'text-secondary'}`}
                onClick={() => setActiveSection('project')}
                style={{ cursor: 'pointer' }}
              >
                Project
              </button>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-decoration-none ${activeSection === 'users' ? 'active text-white' : 'text-secondary'}`}
                  onClick={() => setActiveSection('users')}
                  style={{ cursor: 'pointer' }}
                >
                  Manage Users (Admin)
                </button>
              </li>
            )}
          </ul>
          {user && (
            <div className="d-flex align-items-center ms-3">
              <span className="text-white me-3">
                👤 {user.name}
              </span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
