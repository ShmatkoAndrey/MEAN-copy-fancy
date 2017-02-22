"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ModalLogRegComponent = (function () {
    function ModalLogRegComponent() {
        this.modalOff = new core_1.EventEmitter();
        this.switchLogin = new core_1.EventEmitter();
    }
    ModalLogRegComponent.prototype.onOff = function () {
        this.modalOff.emit();
    };
    ModalLogRegComponent.prototype.onSwitch = function (flag) {
        this.switchLogin.emit(flag);
    };
    return ModalLogRegComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalLogRegComponent.prototype, "show_modal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalLogRegComponent.prototype, "isLogin", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalLogRegComponent.prototype, "modalOff", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalLogRegComponent.prototype, "switchLogin", void 0);
ModalLogRegComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'modal-lr',
        templateUrl: 'modal-lr.component.html',
        styleUrls: ['modal-lr.component.css']
    })
], ModalLogRegComponent);
exports.ModalLogRegComponent = ModalLogRegComponent;
//# sourceMappingURL=modal-lr.component.js.map