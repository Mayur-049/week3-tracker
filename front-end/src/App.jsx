import React, { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Footer from "./components/Footer";
import NewProducts from "./components/NewProducts";
import Users from "./components/Users";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return (storedUser && token) ? JSON.parse(storedUser) : null;
  });
  const [authView, setAuthView] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveSection('home');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setActiveSection('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setActiveSection('home');
  };

  const renderSection = () => {
    if (!user) {
      if (authView === 'login') {
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />;
      } else {
        return <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthView('login')} />;
      }
    }

    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'project':
        return <Project />;
      case 'products':
        return <NewProducts />;
      case 'users':
        return <Users />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      {user && <Header activeSection={activeSection} setActiveSection={setActiveSection} user={user} onLogout={handleLogout} />}
      <main className="flex-grow-1 py-4">
        <div className="container">
          {renderSection()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;