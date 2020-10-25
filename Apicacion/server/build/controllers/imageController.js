"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = void 0;
var ImageController = /** @class */ (function () {
    function ImageController() {
    }
    ImageController.prototype.create = function (req, res) {
        console.log('fotocargada');
        res.json({ text: req.file.path });
    };
    ImageController.prototype.get = function (req, res) {
        console.log('fotocargada');
        res.json({ text: 'foto cargada' });
    };
    return ImageController;
}());
exports.imageController = new ImageController();
