import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  
 // private socket=io('http://192.168.0.8:3009');
  constructor() {
   
  }

  

 /* listen(eventname:string){    
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data)=>{
        subscriber.next(data);
      })
    });
  }

  emmit(eventname:string, data:any){
    this.socket.emit(eventname,data);
  }*/
}
