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
        this.router.post('/categoria', productoController_1.productoController.addCategoria);
        this.router.get('/categoria/:id', productoController_1.productoController.getCategoria);
        this.router.get('/categorias', productoController_1.productoController.getCategorias);
        this.router.post('/categorias/update', productoController_1.productoController.updateCategoria);
        this.router.post('/', productoController_1.productoController.addProducto);
        this.router.get('/Inicio/:id', productoController_1.productoController.getProductos);
        this.router.get('/MisProductos/:id', productoController_1.productoController.getMyProductos);
        this.router.post('/Ordenar', productoController_1.productoController.getFiltro);
    };
    return ProductoRoutes;
}());
var productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
