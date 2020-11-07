import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }
  chats:any=[];
  ngOnInit(): void {
    this.getChats();
  }

  getChats(){
    this.userService.getChats(this.userService.getSesion().id).subscribe(
      res=>{ this.chats=res; console.log(this.chats);
      },
      err=>{console.log(err);
      }
    );
  }

  chat(id:any){
    this.router.navigate(['user/Chat/'+id])
  }

}
