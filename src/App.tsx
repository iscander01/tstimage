import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User, UserFormData } from './types';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers).map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt)
      }));
      setUsers(parsedUsers);
    }
  }, []);

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date()
    };
    setUsers(prev => [...prev, newUser]);
    setShowForm(false);
  };

  const handleEditUser = (userData: UserFormData) => {
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData }
          : user
      ));
      setEditingUser(undefined);
      setShowForm(false);
    }
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingUser(undefined);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management System</h1>
        <button 
          className="btn btn-primary add-user-btn"
          onClick={() => setShowForm(true)}
        >
          Add New User
        </button>
      </header>

      <main className="app-main">
        <UserList 
          users={users}
          onEdit={openEditForm}
          onDelete={handleDeleteUser}
        />
      </main>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleEditUser : handleAddUser}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default App; 