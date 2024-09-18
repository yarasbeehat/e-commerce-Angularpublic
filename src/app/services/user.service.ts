import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private router:Router,private httpService:HttpService) { }
  private apiURL = 'https://localhost:7197/api/User';
  httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' },
    )}

    checkUserExists(email: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiURL}/exists?email=${email}`);
    }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user, this.httpOptions);
  }
  
  }