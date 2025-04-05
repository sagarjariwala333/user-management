import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor() { }

  getUsers() {
    return this.users;
  }

  addOrUpdateUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
  
    if (index !== -1) {
      // Update existing user
      this.users[index] = user;
    } else {
      // Add new user
      user.id = new Date().getTime();
      this.users.push(user);
    }
  
    this.saveUsers();
  }
  

  updateUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.saveUsers();
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsers();
  }

  private saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
