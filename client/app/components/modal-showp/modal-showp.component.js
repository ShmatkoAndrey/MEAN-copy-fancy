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
var ModalShowProductComponent = (function () {
    function ModalShowProductComponent() {
        this.modalOff = new core_1.EventEmitter();
    }
    ModalShowProductComponent.prototype.onOff = function () {
        this.modalOff.emit();
    };
    ModalShowProductComponent.prototype.ngOnInit = function () {
        this.main_img = this.product.mainPhoto;
    };
    ModalShowProductComponent.prototype.showPhoto = function (photo) {
        this.main_img = photo;
    };
    ModalShowProductComponent.prototype.contentClick = function () {
    };
    return ModalShowProductComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalShowProductComponent.prototype, "show_modal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ModalShowProductComponent.prototype, "product", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalShowProductComponent.prototype, "modalOff", void 0);
ModalShowProductComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'modal-showp',
        templateUrl: 'modal-showp.component.html',
        styleUrls: ['modal-showp.component.css', 'product.component.css']
    })
], ModalShowProductComponent);
exports.ModalShowProductComponent = ModalShowProductComponent;
//# sourceMappingURL=modal-showp.component.js.map