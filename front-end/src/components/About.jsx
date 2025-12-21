import React from 'react';

function About() {
  return (
    <div className="container my-3">
      <h3 className="mb-3">About This Project</h3>
      <p className="text-muted mb-3">
        Expense Tracker is a simple, fast web app to record daily expenses,
        organize them by category, and view quick summaries. It’s built with
        React and Bootstrap for a clean, responsive experience.
      </p>

      <h5 className="mt-4">Key Features</h5>
      <ul className="text-muted mb-3">
        <li>Add, edit, and delete expenses</li>
        <li>Category-wise organization and filtering</li>
        <li>Monthly/overall summary at a glance</li>
        <li>Responsive UI for desktop and mobile</li>
        <li>Works with local storage; backend-ready</li>
      </ul>

      <h5 className="mt-4">About Me</h5>
      <p className="text-muted">
        Made by <strong>Mayur Devendrabhai Patel</strong>. Connect on LinkedIn:
        {' '}
        <a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/your-profile
        </a>
      </p>
    </div>
  );
}

export default About;
