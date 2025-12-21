import React, { useState } from 'react';

const DeleteConfirmModal = ({ user, onClose, onConfirm, isLoading = false }) => {
  const [loading, setLoading] = useState(false);
  const busy = loading || isLoading;

  const handleDelete = async () => {
    if (!user || typeof onConfirm !== 'function') return;
    setLoading(true);
    try {
      await onConfirm(user._id || user.id);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">🗑️ Delete User</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
              disabled={busy}
            ></button>
          </div>
          
          <div className="modal-body">
            <div className="alert alert-warning" role="alert">
              <strong>⚠️ Warning:</strong> This action cannot be undone!
            </div>
            
            <p className="mb-3">Are you sure you want to delete this user?</p>
            
            <div className="card">
              <div className="card-body">
                <h6 className="card-title mb-2">{user.name}</h6>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="card-text mb-0">
                  <strong>Role:</strong> <span className="badge bg-info">{user.role}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={busy}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={busy}
            >
              {busy ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <span className="me-2">🗑️</span> Yes, Delete User
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
