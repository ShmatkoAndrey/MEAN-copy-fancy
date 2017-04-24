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
var router_1 = require("@angular/router");
var product_service_1 = require("../../services/product.service");
var StorePageComponent = (function () {
    function StorePageComponent(productService, route) {
        this.productService = productService;
        this.route = route;
    }
    StorePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.productService.getStoreProducts(params['id']).then(function (products) { return _this.products = products; });
            _this.productService.getStore(params['id']).then(function (store) { return _this.store = store; }).then(function () { return console.log(_this.store); });
        });
    };
    StorePageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return StorePageComponent;
}());
StorePageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'store-page',
        templateUrl: 'store-page.component.html',
        styleUrls: ['store-page.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute])
], StorePageComponent);
exports.StorePageComponent = StorePageComponent;
//# sourceMappingURL=store-page.component.js.map