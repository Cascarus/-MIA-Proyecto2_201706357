import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url:string = "http://localhost:3009/";
  
  addUser(user: User){
    return this.http.post(`${this.url}user/`,user);
  }

  getUsers(){
    return this.http.get(`${this.url}user/`);
  }

  login(user: User){
    return this.http.post(`${this.url}user/login`,user);
  }

  setUser(user:any):void{
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser',user_string);  
  }

  getSesion(){
    let user_string = localStorage.getItem('currentUser');
    return JSON.parse(user_string);
  }

  limpiarSesion(){
    localStorage.removeItem("currentUser");
  }

  confirmacionRegister(token:string){
    return this.http.get(`${this.url}user/confirmacion/${token}`);
  }

}
