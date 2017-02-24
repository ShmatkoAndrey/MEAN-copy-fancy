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
        this.descriptionPhoto = [];
        this.imageDescriptionSrc = [];
    }
    ModalNewProductComponent.prototype.onOff = function () {
        this.modalOff.emit();
    };
    ModalNewProductComponent.prototype.onSubmit = function () {
        // this.productSetvice.createNewProduct({ title: this.title, description: this.description, price: this.price, tags: this.tags.split(' ') })
    };
    ModalNewProductComponent.prototype.onChangeMain = function (e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            console.log('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoadedMain.bind(this);
        reader.readAsDataURL(file);
        this.mainPhoto = file;
    };
    ModalNewProductComponent.prototype._handleReaderLoadedMain = function (e) {
        var reader = e.target;
        this.imageMainSrc = reader.result;
    };
    ModalNewProductComponent.prototype.onChangeDescription = function (e) {
        this.descriptionPhoto = [];
        this.imageDescriptionSrc = [];
        var files = e.target.files;
        var files_arr = Object.keys(files).map(function (key) { return files[key]; });
        files_arr.forEach(function (file) {
            var pattern = /image-*/;
            var reader = new FileReader();
            if (!file.type.match(pattern)) {
                console.log('invalid format');
                return;
            }
            reader.onload = this._handleReaderLoadedDescription.bind(this);
            reader.readAsDataURL(file);
            this.descriptionPhoto.push(file);
        }.bind(this));
    };
    ModalNewProductComponent.prototype._handleReaderLoadedDescription = function (e) {
        var reader = e.target;
        this.imageDescriptionSrc.push(reader.result);
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