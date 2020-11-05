import { Router } from 'express';
import { apiController } from '../controllers/apiController'
class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
      this.router.get('/recuperrarContrasenia/:id', apiController.recuperrar);
      this.router.post('/sendEmail', apiController.emailSend  );
      this.router.post('/cambioPass', apiController.cambiarpass  );
      this.router.get('/reportes', apiController.reporte1 );
      this.router.get('/reportes1Or/:id', apiController.reporte1Or);
      this.router.post('/Bitacoraadd', apiController.addBitacora);
      this.router.get('/reporte2', apiController.getReporte2);
      this.router.get('/reporte3', apiController.getReporte3);
      this.router.get('/reporte4', apiController.getReporte4);
      this.router.get('/reporte5', apiController.getReporte5);
      this.router.get('/reporte6', apiController.getReporte6);
   /*  this.router.get('/consulta2', apiController.consulta2  );
     this.router.get('/consulta3', apiController.consulta3  );
     this.router.get('/consulta4', apiController.consulta4  );
     this.router.get('/consulta5', apiController.consulta5  );
     this.router.get('/consulta6', apiController.consulta6  );
     this.router.get('/consulta7', apiController.consulta7  );
     this.router.get('/consulta8', apiController.consulta8  );
     this.router.get('/consulta9', apiController.consulta9  );
     this.router.get('/consulta10', apiController.consulta10  );
     this.router.get('/eliminarTemporal', apiController.eliminarTemporal  );
     this.router.get('/eliminarModelo', apiController.eliminarModelo  );
     this.router.get('/cargarTemporal', apiController.cargarTemporal  );
     this.router.get('/cargarModelo', apiController.cargarModelo  );*/
    }
}

const apiRoutes = new ApiRoutes();

export default apiRoutes.router;

