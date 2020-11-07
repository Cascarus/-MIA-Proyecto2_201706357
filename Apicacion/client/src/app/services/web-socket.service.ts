import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly uri: string = "http://192.168.0.8:3009"

  constructor() {
   //this.socket = io(this.uri);
  }

  

  listen(eventname:string){
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data)=>{
        subscriber.next(data);
      })
    });
  }

  emmit(eventname:string, data:any){
    this.socket.emit(eventname,data);
  }
}
