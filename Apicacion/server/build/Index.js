"use strict";
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
var path_1 = __importDefault(require("path"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', 3009);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api', apiRputes_1.default);
        this.app.use('/user', userRoutes_1.default);
        this.app.use('/image', imageRoutes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('Server on port ', _this.app.get('port'));
        });
    };
    return Server;
}());
exports.server = new Server();
exports.server.start();
