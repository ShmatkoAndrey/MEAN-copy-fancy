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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_service_1 = require("./services/product.service");
var AppComponent = (function () {
    function AppComponent(productService) {
        this.productService = productService;
        this.adminPanel = false;
        this.load_posts = false;
    }
    AppComponent.prototype.onScroll = function (event) {
        var _this = this;
        if (this.load_posts && (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight)) {
            this.load_posts = false;
        }
        if (!this.load_posts) {
            if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 400) {
                this.load_posts = true;
                this.productService.continueProducts().then(function () { return _this.load_posts = false; });
            }
        }
    };
    AppComponent.prototype.onAdminPanelOn = function () {
        this.adminPanel = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['app.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map