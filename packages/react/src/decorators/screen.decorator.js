"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = void 0;
var decorator_metadata_1 = require("./decorator.metadata");
function Screen(props) {
    return function (target) {
        var _a = props.type, type = _a === void 0 ? 'page' : _a, _b = props.initial, initial = _b === void 0 ? false : _b, _c = props.path, path = _c === void 0 ? "/".concat(target.name.toLowerCase()) : _c, _d = props.name, name = _d === void 0 ? target.name : _d;
        Reflect.defineMetadata(decorator_metadata_1.TypeMetadata, type, target);
        Reflect.defineMetadata(decorator_metadata_1.PathMetadata, path, target);
        Reflect.defineMetadata(decorator_metadata_1.NameMetadata, name, target);
        Reflect.defineMetadata(decorator_metadata_1.InitialMetadata, initial, target);
    };
}
exports.Screen = Screen;
