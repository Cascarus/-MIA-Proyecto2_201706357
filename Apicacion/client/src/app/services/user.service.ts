import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url:string = "http://192.168.0.8:3009/";
  
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

  startChat(objecto:any){
    return this.http.post(`${this.url}user/mensaje/send`, objecto);
  }

  enviarMensaje(objecto:any){
    return this.http.post(`${this.url}user/mensaje/enviar`, objecto);
  }

  getMensajes(id:any){
    return this.http.get(`${this.url}user/mensaje/obtener/${id}`);
  }

  getChats(id:any){
    return this.http.get(`${this.url}user/mensaje/obtenerChats/${id}`);
  }

  
  updateUsuer(user:User){
    return this.http.post(`${this.url}user/update`,user)
  }

  reporte1(){
    return this.http.get(`${this.url}api/reportes`)
  }

  reporte1Or(OrderBy:string){
    return this.http.get(`${this.url}api/reportes1Or/${OrderBy}`)
  }

  addBitacora(objecto:any){
    return this.http.post(`${this.url}api/Bitacoraadd`,objecto)
  }

  getReporte2(){
    return this.http.get(`${this.url}api/reporte2`)
  }

  getReporte3(){
    return this.http.get(`${this.url}api/reporte3`)
  }

  getReporte4(){
    return this.http.get(`${this.url}api/reporte4`)
  }

  getReporte5(){
    return this.http.get(`${this.url}api/reporte5`)
  }

  getReporte52(){
    return this.http.get(`${this.url}api/reporte52`)
  }

  getReporte6(){
    return this.http.get(`${this.url}api/reporte6`)
  }

  getReporte7(){
    return this.http.get(`${this.url}api/reporte7`)
  }

  getReporte8(){
    return this.http.get(`${this.url}api/reporte8`)
  }
}
