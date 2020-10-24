"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var imageController_1 = require("../controllers/imageController");
var multer_1 = __importDefault(require("../libs/multer"));
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UserRoutes.prototype.config = function () {
        this.router.post('/', multer_1.default.single('image'), imageController_1.imageController.create);
        this.router.get('/', imageController_1.imageController.get);
    };
    return UserRoutes;
}());
var userRoutes = new UserRoutes();
exports.default = userRoutes.router;
