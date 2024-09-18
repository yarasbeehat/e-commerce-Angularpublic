import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http:HttpClient,private router:Router,private httpService:HttpService) { }
  private apiURL = 'https://localhost:7197/items';
  

  private getHttpOptions(){

    const token = localStorage.getItem('Token');
    if(!token){
      this.router.navigate(['/login']);
      return { headers: new HttpHeaders() };
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }


  getItems():Observable<Item[]>{
    let options=this.getHttpOptions();
    return this.http.get<Item[]>(this.apiURL,options);
  }

  getItems2():Promise<Item[]>{
    return this.httpService.get<Item[]>(this.apiURL);
  }

  getItemById(id:number):Observable<Item>{
    let options=this.getHttpOptions();
    return this.http.get<Item>(`${this.apiURL}/${id}`,options);
  }

  addItem(item:Item):Observable<Item>{
    let options=this.getHttpOptions();
    return this.http.post<Item>(this.apiURL,item,options);
  }

  updateItem(id: number,item:Item):Observable<void>{
    let options=this.getHttpOptions();
    return this.http.put<void>(`${this.apiURL}/${id}`, item,options);
  }

  deleteItem(id: number): Observable<void> {
    let options=this.getHttpOptions();
    return this.http.delete<void>(`${this.apiURL}/${id}`,options);
  }


  
}
