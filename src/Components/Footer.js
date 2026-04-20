import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Salem Boxing Club. All Rights Reserved.</p>
        <p style={{ fontSize: '0.7rem', marginTop: '10px', opacity: 0.5 }}>Designed for excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;
