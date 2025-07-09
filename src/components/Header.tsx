import React from 'react';
import './Header.css';

interface HeaderProps {
  onAddUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>User Management System</h1>
        <button className="btn btn-primary" onClick={onAddUser}>
          + Add New User
        </button>
      </div>
    </header>
  );
};

export default Header; 