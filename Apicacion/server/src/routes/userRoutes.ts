import { Router } from 'express';
import { userController } from '../controllers/userController'
class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
      this.router.get('/', userController.getUser  );
      this.router.post('/login', userController.login  );
      this.router.get('/confirmacion/:id', userController.confirmacion );
      this.router.get('/:id', userController.getOneUser );
      this.router.post('/', userController.create  );
      this.router.post('/sendEmail', userController.emailSend  );
      this.router.post('/update', userController.update);
      this.router.delete('/:id',userController.delete);
      this.router.get('/paises/all', userController.getPaises);
      this.router.post('/mensaje/send',userController.addMensaje);
      this.router.post('/mensaje/enviar',userController.enviarMensaje);
      this.router.get('/mensaje/obtener/:id',userController.getMensajes);
      this.router.get('/mensaje/obtenerChats/:id',userController.getChats);
    }
}

const userRoutes = new UserRoutes();

export default userRoutes.router;
