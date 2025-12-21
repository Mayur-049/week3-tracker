import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card';
import API_URL from '../config';

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/Resource`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data.resources || []);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!amount.trim()) newErrors.amount = 'Amount is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/Resource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          amount: parseFloat(amount),
          status: 'active'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add expense');
      }

      setExpenses([data.resource, ...expenses]);
      
      setTitle('');
      setCategory('Food');
      setAmount('');
      setDescription('');
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to add expense');
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/Resource/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setExpenses(expenses.filter(expense => expense._id !== id));
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete all expenses?')) {
      try {
        const token = localStorage.getItem('token');
        for (const expense of expenses) {
          await fetch(`${API_URL}/api/Resource/${expense._id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        setExpenses([]);
      } catch (error) {
        console.error('Error clearing expenses:', error);
      }
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const cardsData = [
    {
      id: 1,
      title: 'Groceries Shopping',
      description: 'Weekly grocery shopping at the market.',
      category: 'Food',
      amount: 1250.5,
      date: '2025-12-01'
    },
    {
      id: 2,
      title: 'Gas Station',
      description: 'Fuel expense for the car.',
      category: 'Transportation',
      amount: 320.0,
      date: '2025-12-05'
    }
  ];

  return (
    <section className={`home-section py-5 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-4 fw-bold text-primary mb-2"> Expense Tracker</h1>
            <p className="lead">Manage your spending efficiently</p>
          </div>
          <button
            className={`btn btn-lg ${isDarkMode ? 'btn-warning' : 'btn-outline-dark'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className={`card shadow-lg mb-5 ${isDarkMode ? 'bg-dark border-secondary' : ''}`}>
          <div className={`card-header ${isDarkMode ? 'bg-secondary' : 'bg-light'}`}>
            <h3 className="mb-0">➕ Add New Expense</h3>
          </div>
          <div className="card-body">
            {showSuccess && (
              <div className="alert alert-success alert-dismissible fade show">
                ✅ Expense added successfully!
                <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger alert-dismissible fade show">
                ❌ {errorMessage}
                <button type="button" className="btn-close" onClick={() => setErrorMessage('')}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''} ${isDarkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                    placeholder="e.g., Grocery Shopping"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Category</label>
                  <select
                    className={`form-select ${isDarkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Food</option>
                    <option>Transportation</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                    <option>Shopping</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Amount (₹)</label>
                  <input
                    type="number"
                    className={`form-control ${errors.amount ? 'is-invalid' : ''} ${isDarkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                    placeholder="0.00"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  {errors.amount && <div className="invalid-feedback d-block">{errors.amount}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Description</label>
                  <input
                    type="text"
                    className={`form-control ${errors.description ? 'is-invalid' : ''} ${isDarkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                    placeholder="e.g., Weekly shopping"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Adding...
                    </>
                  ) : (
                    '💾 Add Expense'
                  )}
                </button>
                <button
                  type="reset"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={() => {
                    setTitle('');
                    setAmount('');
                    setDescription('');
                    setErrors({});
                  }}
                  disabled={loading}
                >
                  ✖️ Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {expenses.length > 0 && (
          <div className={`alert alert-info mb-4 ${isDarkMode ? 'bg-dark border-info' : ''}`}>
            <h5 className="mb-2">💰 Total Expenses: ₹{totalAmount.toFixed(2)}</h5>
            <p className="mb-0">You have {expenses.length} expense record(s)</p>
          </div>
        )}
        <div className={`card shadow-lg mb-5 ${isDarkMode ? 'bg-dark border-secondary' : ''}`}>
          <div className={`card-header ${isDarkMode ? 'bg-secondary' : 'bg-light'} d-flex justify-content-between align-items-center`}>
            <h3 className="mb-0">📋 Expense List</h3>
            {expenses.length > 0 && (
              <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
                🗑️ Clear All
              </button>
            )}
          </div>
          <div className="card-body">
            {expenses.length === 0 ? (
              <p className={`text-center py-5 ${isDarkMode ? 'text-secondary' : 'text-muted'}`}>
                No expenses yet. Add one to get started!
              </p>
            ) : (
              <div className="row g-3">
                {expenses.map((expense) => (
                  <div key={expense._id} className="col-md-6 col-lg-4">
                    <Card
                      id={expense._id}
                      title={expense.title}
                      description={expense.description}
                      category={expense.category}
                      amount={expense.amount}
                      date={new Date(expense.createdAt).toLocaleDateString()}
                      isDarkMode={isDarkMode}
                      onDelete={handleDeleteExpense}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="mb-4">🎯 Sample Expenses</h3>
          <div className="row g-4">
            {cardsData.map((card) => (
              <div key={card.id} className="col-md-6">
                <Card
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  category={card.category}
                  amount={card.amount}
                  date={card.date}
                  isDarkMode={isDarkMode}
                  onDelete={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
