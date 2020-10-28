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

  sendEmail(user: User){//Envia email de confirmacion
    return this.http.post(`${this.url}user/sendEmail`,user);
  }

  getOneUser(id:string){//Optiene un solo usuario dependiendo del ID
    return this.http.get(`${this.url}user/${id}`);
  }

  getUserEmail(email:string){//Optiene un solo usuario dependiendo del correo 
    return this.http.get(`${this.url}api/recuperrarContrasenia/${email}`);
  }

  sendEmailRecuperar(user: any){//Envia email para recuperar contrasenia
    return this.http.post(`${this.url}api/sendEmail`,user);
  }

  updatePass(user:any){
    return this.http.post(`${this.url}api/cambioPass`,user)
  }

  getPaises(){
    return this.http.get(`${this.url}user/paises/all`);
  }

  updateUsuer(user:User){
    return this.http.post(`${this.url}user/update`,user)
  }
}
