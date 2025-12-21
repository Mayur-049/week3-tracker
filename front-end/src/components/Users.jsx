import React, { useState, useEffect } from 'react';
import AddUser from './AddUser';
import EditUser from './EditUser';
import DeleteConfirmModal from './DeleteConfirmModal';
import Toast from './Toast';
import API_URL from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/User`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 403 || response.status === 401) {
          throw new Error('Access Denied: You do not have permission to view this data. (Admin role required)');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (Array.isArray(data)) {
          setUsers(data);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('❌ Error fetching users:', error);
        setError(error.message || 'Failed to fetch users from server.');
        setUsers([]);
        setToast({
          type: 'error',
          message: 'Failed to load users: ' + (error.message || 'Unknown error')
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserAdded = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/User`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
          setToast({
            type: 'success',
            message: '✅ User list refreshed successfully!'
          });
        }
      } else {
        throw new Error('Failed to refresh users list');
      }
    } catch (error) {
      console.error('❌ Error refreshing users:', error);
      setToast({
        type: 'error',
        message: 'Failed to refresh user list: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const showToast = (toastData) => {
    console.log('🔔 Toast triggered:', toastData);
    setToast(toastData);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = (updatedUser, message) => {
    setUsers(users.map(user =>
      user._id === updatedUser._id ? updatedUser : user
    ));
    setEditingUser(null);
    setToast({
      type: 'success',
      message: message || 'User updated successfully!'
    });
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
  };

  const confirmDelete = async (userId) => {
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/User/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }

      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      setDeletingUser(null);
      setToast({
        type: 'success',
        message: `✅ User deleted successfully!`
      });
      console.log('✅ User deleted:', data);
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      setDeletingUser(null);
      setToast({
        type: 'error',
        message: `❌ ${error.message || 'Failed to delete user'}`
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading users from backend...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>Failed to fetch users: {error}</p>
        <hr />
        <p className="mb-0">Make sure the backend server is running</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AddUser
        onUserAdded={handleUserAdded}
        onShowToast={showToast}
      />

      <h2 className="mb-4">Users List (From Backend API)</h2>

      {users.length === 0 ? (
        <p className="text-muted">No users found</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div key={user.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-2">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Role:</strong> <span className="badge bg-info">{user.role}</span>
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary flex-fill"
                      onClick={() => handleEdit(user)}
                      disabled={deleteLoading}
                      title={deleteLoading ? 'Please wait while deleting...' : 'Edit this user'}
                    >
                      <span className="me-1">✏️</span> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger flex-fill"
                      onClick={() => handleDelete(user)}
                      disabled={deleteLoading}
                      title={deleteLoading ? 'Please wait while deleting...' : 'Delete this user'}
                    >
                      <span className="me-1">🗑️</span> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <EditUser
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdate}
        />
      )}

      {deletingUser && (
        <DeleteConfirmModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={confirmDelete}
          isLoading={deleteLoading}
        />
      )}

      <div className="mt-4 p-3 bg-light rounded">
        <small className="text-muted">
          ✅ Data successfully fetched from Backend API (/api/User)
        </small>
      </div>
    </div>
  );
};

export default Users;
