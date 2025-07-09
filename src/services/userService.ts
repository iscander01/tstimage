import { User, CreateUserData, UpdateUserData } from '../types';

const STORAGE_KEY = 'crud_users';

export class UserService {
  private static getUsersFromStorage(): User[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const users = JSON.parse(stored);
      return users.map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt)
      }));
    } catch {
      return [];
    }
  }

  private static saveUsersToStorage(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  static getAllUsers(): User[] {
    return this.getUsersFromStorage();
  }

  static createUser(data: CreateUserData): User {
    const users = this.getUsersFromStorage();
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.push(newUser);
    this.saveUsersToStorage(users);
    return newUser;
  }

  static updateUser(id: string, data: UpdateUserData): User | null {
    const users = this.getUsersFromStorage();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date()
    };
    
    this.saveUsersToStorage(users);
    return users[userIndex];
  }

  static deleteUser(id: string): boolean {
    const users = this.getUsersFromStorage();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
      return false; // User not found
    }
    
    this.saveUsersToStorage(filteredUsers);
    return true;
  }

  static getUserById(id: string): User | null {
    const users = this.getUsersFromStorage();
    return users.find(user => user.id === id) || null;
  }
} 