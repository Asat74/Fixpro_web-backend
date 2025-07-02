import { Injectable } from '@angular/core';

const TOKEN_KEY = 's_token';
const USER_KEY = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY)!);
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isClientLoggedIn(): boolean {
    return !!this.getToken() && this.getUserRole() === 'CLIENT';
  }

  static isCompanyLoggedIn(): boolean {
    return !!this.getToken() && this.getUserRole() === 'COMPANY';
  }

  static signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
