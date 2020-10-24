import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service'
@Component({
  selector: 'app-confirmacion-registro',
  templateUrl: './confirmacion-registro.component.html',
  styleUrls: ['./confirmacion-registro.component.css']
})
export class ConfirmacionRegistroComponent implements OnInit {

  constructor(private active:ActivatedRoute,private userService: UserService) { 
    
  }

  ngOnInit(): void {
    const parm=this.active.snapshot.params;
    var id:string=parm.id;
    this.userService.confirmacionRegister(id).subscribe(
      res => console.log(res),
      err => console.log(err) 
     );
  }

}
