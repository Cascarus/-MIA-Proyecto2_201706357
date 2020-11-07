"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
var database_1 = __importDefault(require("../database"));
var nodemailer_1 = __importDefault(require("nodemailer")); //Envia correos, references https://nodemailer.com/about/
var email_1 = __importDefault(require("../email"));
var crypto = __importStar(require("crypto")); //para incriptar en md5
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    //Esta ruta sera para enviar el correo para cambiar la contrania
    ApiController.prototype.recuperrar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM usuario WHERE email=:ID';
                obj = req.params.id;
                console.log(obj);
                connection.exec(sql, [obj], function (result) {
                    var tempUser = null;
                    if (result.length > 0 && result.length < 2) {
                        tempUser = {
                            nombre: result[0].NOMBRE,
                            apellido: result[0].APELLIDO,
                            email: result[0].EMAIL,
                            token: result[0].TOKEN,
                        };
                        res.json(tempUser);
                    }
                    else {
                        res.json(tempUser);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.emailSend = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, obj, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer_1.default.createTransport({
                            service: "gmail",
                            auth: email_1.default.auth,
                        });
                        obj = req.body;
                        return [4 /*yield*/, transporter.sendMail({
                                from: "familyu3213@gmail.com",
                                to: obj.email,
                                subject: "Cambio de contraseña",
                                text: " Confirme su cambio de contraseña ",
                                html: "<br><h1>Confirme que ud " + obj.nombre + " Quiere cambiar de contraseña.</h1>" + "<br>" + "<h3>Presiona el siguiente link para cambiar la conseña</h3>" + "<br>" +
                                    "<a href=\"http://192.168.0.8:4200/cambioContrasenia/" + obj.token + "\"><buttonhref=\"http://192.168.0.8:4200/cambioContrasenia/" + obj.token + "\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>" +
                                    "<br>" +
                                    "<br><img src=\"https://cdn130.picsart.com/338579709044211.png?type=webp&to=min&r=240\"/>",
                            })];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.cambiarpass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'UPDATE usuario SET pass=:pass WHERE token=:token';
                obj = req.body;
                obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.reporte1 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM Bitacora';
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.reporte1Or = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM Bitacora ORDER BY fecha :id';
                id = req.params.id;
                console.log(id);
                if (id == 'ASC') {
                    sql = 'SELECT * FROM Bitacora ORDER BY fecha ASC';
                }
                else if (id == 'DESC') {
                    sql = 'SELECT * FROM Bitacora ORDER BY fecha DESC';
                }
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.addBitacora = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'INSERT INTO Bitacora (email, fecha, descripcion) VALUES (:email,LOCALTIMESTAMP(2), :descripcion)';
                obj = req.body;
                connection.exec(sql, obj, function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte2 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT P.nombre AS Producto, SUM(DT.cantidad) AS cantidad, U.nombre As cliente, U.apellido FROM detalle_factura DT ' +
                    'INNER JOIN producto P ON (P.idProducto=DT.idProducto) ' +
                    'INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) group by DT.idProducto, P.nombre, U.idusuario, U.nombre, U.apellido ';
                obj = req.body;
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte3 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT P.nombre AS Producto, count(*) AS Me_Gusta, U.nombre As cliente, U.apellido FROM LIKES DT ' +
                    ' INNER JOIN producto P ON (P.idProducto=DT.idProducto) ' +
                    ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) ' +
                    ' WHERE DT.estado=1 ' +
                    ' group by DT.idProducto, P.nombre, U.idusuario, U.nombre, U.apellido';
                obj = req.body;
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte4 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT P.nombre AS Producto, count(*) AS Me_Gusta, U.nombre As cliente, U.apellido FROM LIKES DT ' +
                    ' INNER JOIN producto P ON (P.idProducto=DT.idProducto) ' +
                    ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) ' +
                    ' WHERE DT.estado=2 ' +
                    ' group by DT.idProducto, P.nombre, U.idusuario, U.nombre, U.apellido';
                obj = req.body;
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte5 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT*FROM( ' +
                    ' SELECT * FROM usuario U WHERE confirmacion=1 AND idTIpo_U=2 ' +
                    ' ORDER BY U.credito DESC ' +
                    ' )WHERE  ROWNUM <= 10 ';
                obj = req.body;
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte52 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT*FROM( ' +
                    ' SELECT * FROM usuario U WHERE confirmacion=1 AND idTIpo_U=2 ' +
                    ' ORDER BY U.credito ASC ' +
                    ' )WHERE  ROWNUM <= 10 ';
                obj = req.body;
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte6 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = ' SELECT*FROM( ' +
                    ' SELECT U.nombre,U.email, U.nacimieno, COUNT(*) AS Den FROM denuncias D ' +
                    ' INNER JOIN Usuario U ON (U.idUsuario=D.idUsuario) ' +
                    ' GROUP BY  D.idUsuario, U.nombre, U.email, U.nacimieno ' +
                    ' ORDER BY Den DESC ' +
                    ' ) WHERE ROWNUM <= 10 ';
                obj = req.body;
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte7 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = ' SELECT*FROM( ' +
                    ' SELECT U.nombre, U.email, U.credito, COUNT(*) AS Cant FROM producto P ' +
                    ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) ' +
                    ' WHERE P.estado=0 ' +
                    ' group by P.idUsuario, U.nombre, U.email, U.credito ' +
                    ' ORDER BY Cant DESC ' +
                    ' ) WHERE ROWNUM <= 10 ';
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    ApiController.prototype.getReporte8 = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = ' SELECT * FROM ( ' +
                    ' SELECT PA.nombre, TA.suma, TCLI.clientes,  COUNT(*) AS ventas FROM producto P ' +
                    ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) ' +
                    ' INNER JOIN pais PA ON (PA.idPais=U.idPais) ' +
                    ' INNER JOIN (SELECT PAA.idPais,SUM(UAA.credito) AS suma FROM pais PAA, usuario UAA WHERE UAA.idPais=PAA.idPais group by PAA.idPais)  TA ON (TA.idPais=PA.idPais) ' +
                    ' INNER JOIN (SELECT CLI.idPais, count(*) AS clientes FROM usuario CLI group by CLI.idPais ) TCLI ON (TCLI.idPais=PA.idPais) ' +
                    ' WHERE P.estado=0 ' +
                    ' GROUP BY U.idPais, PA.nombre, TA.suma, TCLI.clientes ' +
                    ' ) WHERE ROWNUM <= 10 ';
                connection.exec(sql, [], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    return ApiController;
}());
exports.apiController = new ApiController();
