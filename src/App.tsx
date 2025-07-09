import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { User, CreateUserData, UpdateUserData } from './types';
import { UserService } from './services/userService';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = UserService.getAllUsers();
    setUsers(allUsers);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const success = UserService.deleteUser(id);
      if (success) {
        loadUsers();
      }
    }
  };

  const handleFormSubmit = (data: CreateUserData | UpdateUserData) => {
    if (isEditing && editingUser) {
      const updatedUser = UserService.updateUser(editingUser.id, data as UpdateUserData);
      if (updatedUser) {
        loadUsers();
        setShowForm(false);
        setEditingUser(null);
        setIsEditing(false);
      }
    } else {
      UserService.createUser(data as CreateUserData);
      loadUsers();
      setShowForm(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
    setIsEditing(false);
  };

  return (
    <div className="App">
      <Header onAddUser={handleAddUser} />
      <main className="main-content">
        <div className="container">
          <UserList 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
          />
        </div>
      </main>
      {showForm && (
        <UserForm
          user={editingUser || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default App;
