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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
var apiRputes_1 = __importDefault(require("./routes/apiRputes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
var productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
var path_1 = __importDefault(require("path"));
var socketIo = __importStar(require("socket.io"));
var http_1 = require("http");
var Server1 = /** @class */ (function () {
    function Server1() {
        this.app = express_1.default();
        this.config();
        this.server = http_1.createServer(this.app);
        this.io = socketIo.default(this.server);
        this.routes();
    }
    Server1.prototype.config = function () {
        this.app.set('port', 3009);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server1.prototype.routes = function () {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api', apiRputes_1.default);
        this.app.use('/user', userRoutes_1.default);
        this.app.use('/image', imageRoutes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
        this.app.use('/producto', productoRoutes_1.default);
    };
    Server1.prototype.start = function () {
        var _this = this;
        var mensaje = "asd";
        this.io.on('connection', function (socket) {
            console.log('mas de algo envia');
        });
        this.server.listen(this.app.get('port'), function () {
            console.log('Server on port ', _this.app.get('port'));
        });
        /* this.io.on('connect', (socket:any) => {
             socket.on('send-message', function(data:any){
                 socket.emit('text-event',mensaje );
                 socket.broadcast.emit('text-event', mensaje);
             });
 
             
         });*/
    };
    return Server1;
}());
exports.server = new Server1();
exports.server.start();
