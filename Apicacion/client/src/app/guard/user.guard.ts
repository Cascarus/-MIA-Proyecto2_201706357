import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service'

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let sesion = this.userService.getSesion();
      if(sesion.rol== 2){
        return true;
      }
      else{
        this.router.navigate(['/notfound']);
        return false;
      }
    
  }

  constructor(private userService: UserService,private router:Router){}
  
}
