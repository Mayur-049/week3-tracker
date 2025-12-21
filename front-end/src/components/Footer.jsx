import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-3 bg-light border-top text-center">
      <small className="text-muted">
        © {year} expense-tracker. All rights reserved.
      </small>
    </footer>
  );
}

export default Footer;