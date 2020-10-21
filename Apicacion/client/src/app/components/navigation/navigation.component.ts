import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
   visible:string="style=\"display: none\"";
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {

  }

}
