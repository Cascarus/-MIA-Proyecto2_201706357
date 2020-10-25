"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.get('/recuperrarContrasenia/:id', apiController_1.apiController.recuperrar);
        this.router.post('/sendEmail', apiController_1.apiController.emailSend);
        this.router.post('/cambioPass', apiController_1.apiController.cambiarpass);
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
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
