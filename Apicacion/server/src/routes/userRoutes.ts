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
      //this.router.get('/:id', userController.getOneUser );
      this.router.post('/', userController.create  );
      this.router.put('/:id', userController.update);
      this.router.delete('/:id',userController.delete);
    }
}

const userRoutes = new UserRoutes();

export default userRoutes.router;
