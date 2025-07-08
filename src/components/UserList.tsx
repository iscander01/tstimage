import React from 'react';
import { User } from '../types';
import './UserList.css';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="user-list">
      <h2>Users ({users.length})</h2>
      {users.length === 0 ? (
        <p className="no-users">No users found. Add your first user!</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Created:</strong> {formatDate(user.createdAt)}</p>
              </div>
              <div className="user-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList; 