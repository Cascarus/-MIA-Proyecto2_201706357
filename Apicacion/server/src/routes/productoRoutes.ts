import { Router } from 'express';
import { productoController } from '../controllers/productoController'
class ProductoRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
      
      this.router.post('/categoria', productoController.addCategoria  );
      this.router.get('/categoria/:id', productoController.getCategoria);
      this.router.get('/categorias', productoController.getCategorias);
      this.router.post('/categorias/update', productoController.updateCategoria);

      this.router.post('/', productoController.addProducto);
      this.router.get('/Inicio/:id', productoController.getProductos)
      this.router.get('/MisProductos/:id', productoController.getMyProductos)
      this.router.post('/Ordenar', productoController.getFiltro)
    }
}

const productoRoutes = new ProductoRoutes();

export default productoRoutes.router;
