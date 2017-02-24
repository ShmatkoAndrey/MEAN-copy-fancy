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
var product_service_1 = require("../../services/product.service");
var ModalNewProductComponent = (function () {
    function ModalNewProductComponent(productSetvice) {
        this.productSetvice = productSetvice;
        this.modalOff = new core_1.EventEmitter();
    }
    ModalNewProductComponent.prototype.onOff = function () {
        this.modalOff.emit();
    };
    ModalNewProductComponent.prototype.onSubmit = function () {
        console.log(this.mainPhoto);
        // this.productSetvice.createNewProduct({ title: this.title, description: this.description, price: this.price, tags: this.tags.split(' ') })
    };
    return ModalNewProductComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ModalNewProductComponent.prototype, "show_modal", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ModalNewProductComponent.prototype, "modalOff", void 0);
ModalNewProductComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'modal-np',
        templateUrl: 'modal-np.component.html',
        styleUrls: ['modal-np.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ModalNewProductComponent);
exports.ModalNewProductComponent = ModalNewProductComponent;
//# sourceMappingURL=modal-np.component.js.map