export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
} 