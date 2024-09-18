import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private router: Router) { }

  private getToken(): string | null {
    return localStorage.getItem('Token');
  }

  private checkAndHandleToken(): string {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('User is not authenticated');
    }
    return token;
  }

  get<T>(url: string, params: any = {}): Promise<T> {
    const token = this.checkAndHandleToken();
    const queryString = new URLSearchParams(params).toString();
    return fetch(`${url}?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if(response.status ==401){}
      return response.json() as Promise<T>;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw new Error('An error occurred during GET request');
    });
  }

  post<T>(url: string, body: any): Promise<T> {
    const token = this.checkAndHandleToken();
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<T>;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw new Error('An error occurred during POST request');
    });
  }

  put<T>(url: string, body: any): Promise<T> {
    const token = this.checkAndHandleToken();
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<T>;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw new Error('An error occurred during PUT request');
    });
  }

  delete<T>(url: string, params: any = {}): Promise<T> {
    const token = this.checkAndHandleToken();
    const queryString = new URLSearchParams(params).toString();
    return fetch(`${url}?${queryString}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<T>;
    })
    .catch(error => {
      console.error('Error:', error.message);
      throw new Error('An error occurred during DELETE request');
    });
  }


}