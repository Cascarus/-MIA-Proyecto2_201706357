import { Router } from 'express';
import { productoController } from '../controllers/productoController';
class ProductoRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
      //Categorias
      this.router.post('/categoria', productoController.addCategoria  );
      this.router.get('/categoria/:id', productoController.getCategoria);
      this.router.get('/categorias', productoController.getCategorias);
      this.router.post('/categorias/update', productoController.updateCategoria);
      //Productos
      this.router.post('/', productoController.addProducto);
      this.router.get('/Inicio/:id', productoController.getProductos);
      this.router.get('/MisProductos/:id', productoController.getMyProductos);
      this.router.post('/Ordenar', productoController.getFiltro);
      this.router.get('/DetalleProducto/:id', productoController.getProductoDetalis);
        //Likes
      this.router.post('/Like', productoController.addLike);;
      this.router.get('/CantLikes/:id', productoController.getCantLikes);
        //Comentarios
      this.router.post('/comentario', productoController.addComentario);
      this.router.get('/comentarios/:id', productoController.getComentario);
        //Denuncias
      this.router.post('/Denuncias', productoController.addDenuncia);
      this.router.get('/Denuncias', productoController.getDenuncias);
      this.router.post('/EstadoDenuncia', productoController.updateDenuncia);
      this.router.post('/SendMail', productoController.emailSend);
        //Carito
      this.router.post('/Carrito/add', productoController.addCarrito);
      this.router.get('/Carrito/all/:id', productoController.getCarritoOneUser);
      this.router.get('/Carrito/Delete/:id', productoController.deleteOneCarrito);
      this.router.get('/Carrito/DeleteAll/:id', productoController.deleteAllCarrito);
        //Compra
      this.router.post('/Compra/add', productoController.addCompra);
      this.router.post('/Compra/correo', productoController.sendEmailCompra)
    }
}

const productoRoutes = new ProductoRoutes();

export default productoRoutes.router;
