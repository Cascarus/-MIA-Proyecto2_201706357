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
exports.userController = void 0;
var database_1 = __importDefault(require("../database"));
var crypto = __importStar(require("crypto")); //para incriptar en md5
var nodemailer_1 = __importDefault(require("nodemailer")); //Envia correos, references https://nodemailer.com/about/
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.mensaje = "Si sale archivos";
    }
    UserController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT * FROM usuario";
                        return [4 /*yield*/, database_1.default.db2().exec(sql, [], function (result) {
                                res.json(result);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj, transporter, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = database_1.default.db2();
                        sql = 'INSERT INTO usuario (nombre,apellido,pass,email,nacimieno,credito,idTipo_U,confirmacion,token) VALUES (:nombre,:apellido,:pass,:email,:nacimieno,:credito,:idTipo_U,:confirmacion,:token)';
                        obj = req.body;
                        obj.token = jsonwebtoken_1.default.sign(obj.email, obj.nombre);
                        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
                        console.log(obj);
                        connection.exec(sql, obj, function (result) {
                            res.json(result);
                        });
                        transporter = nodemailer_1.default.createTransport({
                            service: "gmail",
                            auth: {
                                user: 'familyu3213@gmail.com',
                                pass: 'Steven098'
                            },
                        });
                        return [4 /*yield*/, transporter.sendMail({
                                from: "familyu3213@gmail.com",
                                to: obj.email,
                                subject: "Confirmacion De Registro",
                                text: " Confirme su registro ",
                                html: "<br><h1>Confirma  tu servicio " + obj.nombre + ".</h1>" + "<br>" + "<h3>Presiona el siguiente link para confirmar tu cuenta</h3>" + "<br>" +
                                    "<a href=\"http://localhost:4200/confirmacionUser/" + obj.token + "\"><buttonhref=\"http://localhost:4200/confirmacionUser/" + obj.token + "\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>" +
                                    "<br>" +
                                    "<br><img src=\"https://img.icons8.com/wired/2x/among-us.png\"/>",
                            })];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.emailSend = function (enamil) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer_1.default.createTransport({
                            host: "smtp.ethereal.email",
                            port: 587,
                            secure: false,
                            auth: {
                                user: "jerrod.satterfield@ethereal.email",
                                pass: "xxt33ekw4nZr1Y1vYp",
                            },
                        });
                        return [4 /*yield*/, transporter.sendMail({
                                from: 'Remitente',
                                to: enamil,
                                subject: "Guapa",
                                text: "Como estas?",
                                html: "Hermosa",
                            })];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'SELECT * FROM usuario WHERE email=:email AND pass=:pass';
                obj = req.body;
                obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
                console.log(obj.pass);
                connection.exec(sql, obj, function (result) {
                    if (result.length > 0 && result.length < 2) {
                        var tempUser = {
                            id: result[0].IDUSUARIO,
                            nombre: result[0].NOMBRE,
                            apellido: result[0].APELLIDO,
                            rol: result[0].IDTIPO_U,
                            confirmacion: result[0].CONFIRMACION,
                        };
                        res.json(tempUser);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.confirmacion = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, id;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'UPDATE usuario SET confirmacion=1 WHERE token=:ID';
                id = req.params.id;
                connection.exec(sql, [id], function (result) {
                    res.json(result);
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
                obj = req.body;
                console.log(obj);
                connection.exec(sql, [obj.reg, obj.name, obj.img, obj.mail, obj.pass, obj.phone], function (result) {
                    if (result == undefined) {
                        sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                        connection = database_1.default.db2();
                        connection.execMany(sql, obj.rolTab);
                        res.send({ status: 'success' });
                    }
                    else
                        res.send({ status: 'error' });
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
                obj = req.body;
                console.log(obj);
                connection.exec(sql, [obj.reg, obj.name, obj.img, obj.mail, obj.pass, obj.phone], function (result) {
                    if (result == undefined) {
                        sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                        connection = database_1.default.db2();
                        connection.execMany(sql, obj.rolTab);
                        res.send({ status: 'success' });
                    }
                    else
                        res.send({ status: 'error' });
                });
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, obj;
            return __generator(this, function (_a) {
                connection = database_1.default.db2();
                sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
                obj = req.body;
                console.log(obj);
                connection.exec(sql, [obj.reg, obj.name, obj.img, obj.mail, obj.pass, obj.phone], function (result) {
                    if (result == undefined) {
                        sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                        connection = database_1.default.db2();
                        connection.execMany(sql, obj.rolTab);
                        res.send({ status: 'success' });
                    }
                    else
                        res.send({ status: 'error' });
                });
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.userController = new UserController();
