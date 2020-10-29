"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productoController_1 = require("../controllers/productoController");
var ProductoRoutes = /** @class */ (function () {
    function ProductoRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ProductoRoutes.prototype.config = function () {
        //Categorias
        this.router.post('/categoria', productoController_1.productoController.addCategoria);
        this.router.get('/categoria/:id', productoController_1.productoController.getCategoria);
        this.router.get('/categorias', productoController_1.productoController.getCategorias);
        this.router.post('/categorias/update', productoController_1.productoController.updateCategoria);
        //Productos
        this.router.post('/', productoController_1.productoController.addProducto);
        this.router.get('/Inicio/:id', productoController_1.productoController.getProductos);
        this.router.get('/MisProductos/:id', productoController_1.productoController.getMyProductos);
        this.router.post('/Ordenar', productoController_1.productoController.getFiltro);
        this.router.get('/DetalleProducto/:id', productoController_1.productoController.getProductoDetalis);
        //Likes
        this.router.post('/Like', productoController_1.productoController.addLike);
        ;
        this.router.get('/CantLikes/:id', productoController_1.productoController.getCantLikes);
        //Comentarios
        this.router.post('/comentario', productoController_1.productoController.addComentario);
        this.router.get('/comentarios/:id', productoController_1.productoController.getComentario);
    };
    return ProductoRoutes;
}());
var productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
