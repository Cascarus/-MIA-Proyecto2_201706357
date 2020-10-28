"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UserRoutes.prototype.config = function () {
        this.router.get('/', userController_1.userController.getUser);
        this.router.post('/login', userController_1.userController.login);
        this.router.get('/confirmacion/:id', userController_1.userController.confirmacion);
        this.router.get('/:id', userController_1.userController.getOneUser);
        this.router.post('/', userController_1.userController.create);
        this.router.post('/sendEmail', userController_1.userController.emailSend);
        this.router.post('/update', userController_1.userController.update);
        this.router.delete('/:id', userController_1.userController.delete);
        this.router.get('/paises/all', userController_1.userController.getPaises);
    };
    return UserRoutes;
}());
var userRoutes = new UserRoutes();
exports.default = userRoutes.router;
