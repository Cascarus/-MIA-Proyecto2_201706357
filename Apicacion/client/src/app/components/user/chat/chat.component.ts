import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WebSocketService} from '../../../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensajes:any=[]
  tempMensa:any={
    texto: '',
    idChat: 0,
    idUsuario: 0
  }
  
  eventname='new-message';
  constructor(private active:ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const parm=this.active.snapshot.params;
    this.tempMensa.idChat= Number(parm.id);
    this.tempMensa.idUsuario=this.userService.getSesion().id;
    this.getMensajes();
    /*this.webSocket.listen('connection').subscribe((data)=>{
      console.log('asdasd asdas --*  '+data); this.getMensajes();
    });*/
  }

  getMensajes(){
    this.userService.getMensajes(this.tempMensa.idChat).subscribe(
      res=>{this.mensajes=res; console.log(this.mensajes);
      },
      err=>{console.log(err);
      }
    )
      
    
  }

  enviarMensaje(){
    console.log(this.tempMensa);
    
    this.userService.enviarMensaje(this.tempMensa).subscribe(
      res=>{console.log(res); this.tempMensa.texto=''; this.getMensajes();
      },
      err=>{console.log(err);
      }
    );
  }


}
