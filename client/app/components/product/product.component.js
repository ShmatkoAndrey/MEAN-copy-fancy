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
var user_service_1 = require("../../services/user.service");
var cart_service_1 = require("../../services/cart.service");
var ProductComponent = (function () {
    function ProductComponent(productSetvice, userService, cartService) {
        this.productSetvice = productSetvice;
        this.userService = userService;
        this.cartService = cartService;
        this.show_modal = false;
    }
    ProductComponent.prototype.formatDate = function (date) {
        var d = new Date();
        d.setTime(Date.parse(date));
        var monthNames = [
            "Jan", "Feb", "March",
            "April", "May", "June", "July",
            "August", "Sept", "Oc",
            "Nov", "Dec"
        ];
        var day = d.getDate();
        var monthIndex = d.getMonth();
        var year = d.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
    ProductComponent.prototype.modalOn = function () {
        this.show_modal = true;
    };
    ProductComponent.prototype.modalOff = function () {
        this.show_modal = false;
    };
    ProductComponent.prototype.onLike = function () {
        if (this.userService.user) {
            this.productSetvice.like(this.product);
        }
    };
    ProductComponent.prototype.onAddToCart = function () {
        this.cartService.addToCart(this.product);
    };
    ProductComponent.prototype.onDelete = function () {
        this.productSetvice.deleteProduct(this.product._id);
    };
    return ProductComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProductComponent.prototype, "product", void 0);
ProductComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'product',
        templateUrl: 'product.component.html',
        styleUrls: ['product.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        user_service_1.UserService,
        cart_service_1.CartService])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map