import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {private apiUrl = 'https://localhost:7197/api/User';
  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' },
    )
  }
  constructor(private http: HttpClient, private router: Router, private httpService:HttpService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, { email, password },this.httpOptions);
  }


  logout(){
    localStorage.removeItem('Token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('Token');
    return !!token; // Return true if token exists
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ResetPassword`, { email });
  }
}