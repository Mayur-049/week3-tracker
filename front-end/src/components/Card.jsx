import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ title, description, category, amount, date, isDarkMode, onDelete, id }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={`card shadow-sm h-100 ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white border-light'}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h5 className={`card-title fw-bold mb-2 ${isCompleted ? 'text-decoration-line-through text-muted' : ''}`}>
              {title}
            </h5>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <span className="badge bg-primary">{category}</span>
              {date && (
                <small className={`${isDarkMode ? 'text-secondary' : 'text-muted'}`}>
                  📅 {date}
                </small>
              )}
            </div>
          </div>
          {amount !== undefined && (
            <div className="text-end ms-3">
              <h6 className="fw-bold mb-0 text-success">
                ₹{Number(amount).toFixed(2)}
              </h6>
            </div>
          )}
        </div>
        <p className={`card-text mb-3 ${isDarkMode ? 'text-secondary' : 'text-muted'}`}>
          {description}
        </p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <button
              className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleLike}
              title={isLiked ? 'Unlike this expense' : 'Like this expense'}
            >
              ❤️ {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-outline-success'}`}
              onClick={handleToggleComplete}
              title="Mark as completed"
            >
              {isCompleted ? '✓ Done' : 'Mark Done'}
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(id)}
              title="Delete this expense"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
