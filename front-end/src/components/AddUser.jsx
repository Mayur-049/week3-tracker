import React, { useState } from 'react';
import API_URL from '../config';

const AddUser = ({ onUserAdded, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const showToast = (toastData) => {
    console.log('📨 AddUser - showToast called with:', toastData);
    console.log('📨 onShowToast is:', typeof onShowToast);
    
    if (typeof onShowToast === 'function') {
      onShowToast(toastData);
    } else {
      console.warn('❌ onShowToast is not a function!');
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (formData.mobile && formData.mobile.trim()) {
      if (!/^\d{10}$/.test(formData.mobile)) {
        errors.mobile = 'Mobile number must be 10 digits';
      }
    }

    if (formData.address && formData.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters';
    }

    if (formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      setLoading(false);
      setErrorMessage('Please fix the validation errors above');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.message || data.msg || 'Failed to add user';
        if (response.status === 400) {
          errorMsg = '⚠️ Validation Error: ' + errorMsg;
        } else if (response.status === 409) {
          errorMsg = '⚠️ Conflict: ' + errorMsg;
        } else if (response.status === 500) {
          errorMsg = '❌ Server Error: ' + errorMsg;
        }
        throw new Error(errorMsg);
      }

      const userName = data.name || data.user?.name || formData.name;
      setSuccessMessage(`✅ User added successfully - ${userName}`);
      
      const toastMessage = `User "${userName}" added successfully! 🎉`;
      console.log('✉️ Toast message:', toastMessage);
      showToast({
        type: 'success',
        message: toastMessage
      });
      
      setFormData({
        name: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
        role: 'user'
      });

      if (onUserAdded) {
        onUserAdded();
      }

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('❌ Error adding user:', error);
      const errorMsg = `❌ ${error.message || 'Failed to add user'}`;
      setErrorMessage(errorMsg);
      
      console.log('❌ Error toast:', errorMsg);
      showToast({
        type: 'error',
        message: error.message || 'Failed to add user'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container mb-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">➕ Add New User</h5>
        </div>
        <div className="card-body">
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {successMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMessage('')}
              ></button>
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setErrorMessage('')}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <strong>Full Name</strong>
              </label>
              <input
                type="text"
                className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {validationErrors.name && (
                <div className="invalid-feedback d-block">
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>Email Address</strong>
              </label>
              <input
                type="email"
                className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {validationErrors.email && (
                <div className="invalid-feedback d-block">
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                <strong>Mobile Number (Optional)</strong>
              </label>
              <input
                type="text"
                className={`form-control ${validationErrors.mobile ? 'is-invalid' : ''}`}
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
              />
              {validationErrors.mobile && (
                <div className="invalid-feedback d-block">
                  {validationErrors.mobile}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                <strong>Address (Optional)</strong>
              </label>
              <textarea
                className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address (minimum 5 characters)"
                rows="2"
              ></textarea>
              {validationErrors.address && (
                <div className="invalid-feedback d-block">
                  {validationErrors.address}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <strong>Password (Optional)</strong>
              </label>
              <input
                type="password"
                className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (minimum 6 characters)"
              />
              {validationErrors.password && (
                <div className="invalid-feedback d-block">
                  {validationErrors.password}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                <strong>Role</strong>
              </label>
              <select
                className={`form-select ${validationErrors.role ? 'is-invalid' : ''}`}
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {validationErrors.role && (
                <div className="invalid-feedback d-block">
                  {validationErrors.role}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding User...
                </>
              ) : (
                'Add User'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
