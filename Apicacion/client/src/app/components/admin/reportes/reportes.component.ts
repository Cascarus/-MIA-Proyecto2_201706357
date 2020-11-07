import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  idOrderBY:any='';
  precios:any=[{id:'DESC',texto:'Descendente'},{id:'ASC',texto:'Ascendente'}];
  constructor(private userService: UserService) { }
  
  repo1:any=[];
  repo2:any=[];
  repo3:any=[];
  repo4:any=[];
  repo5:any=[];
  repo52:any=[];
  repo6:any=[];
  repo7:any=[];
  repo8:any=[];

  ngOnInit(): void {
    this.reporteOne();  
  }

  reporteOne(){
    this.getReporte1();
    this.getReporte2();
    this.getReporte3();
    this.getReporte4();
    this.getReporte5();
    this.getReporte52();
    this.getReporte6();
    this.getReporte7();
    this.getReporte8();
  }

  
  OrdenarBitacora(){
    this.userService.reporte1Or(this.idOrderBY).subscribe(
      res=>{ this.repo1=res;console.log(res); this.ponerFecha();},
      err=> console.log(err)
      
    );
  }

  ponerFecha(){
   
  }

  getReporte1(){
    this.userService.reporte1().subscribe(
      res=>{this.repo1=res;console.log(res);this.ponerFecha();
      },
      err=>console.log(err)
    );
  }

  getReporte2(){
    this.userService.getReporte2().subscribe(
      res=>{console.log(res); this.repo2=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte3(){
    this.userService.getReporte3().subscribe(
      res=>{console.log(res); this.repo3=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte4(){
    this.userService.getReporte4().subscribe(
      res=>{console.log(res); this.repo4=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte5(){
    this.userService.getReporte5().subscribe(
      res=>{console.log(res); this.repo5=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte52(){
    this.userService.getReporte52().subscribe(
      res=>{console.log(res); this.repo52=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte6(){
    this.userService.getReporte6().subscribe(
      res=>{console.log(res); this.repo6=res;
      },
      err=>{console.log(err);
      }
    );
  }

  getReporte7(){
    this.userService.getReporte7().subscribe(
      res=>{console.log(res); this.repo7=res;

      },
      err=>{console.log(err);
      }
    );
  }

  getReporte8(){
    this.userService.getReporte8().subscribe(
      res=>{console.log(res); this.repo8=res;

      },
      err=>{console.log(err);
      }
    );
  }
}
