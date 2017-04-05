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
var router_1 = require("@angular/router");
var product_service_1 = require("../../services/product.service");
var TagsListComponent = (function () {
    function TagsListComponent(productService, route) {
        this.productService = productService;
        this.route = route;
    }
    TagsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.productService.getByTag(params['name']).then(function (products) { return _this.products = products; });
        });
    };
    TagsListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return TagsListComponent;
}());
TagsListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tags-list',
        templateUrl: 'tags-list.component.html',
        styleUrls: ['tags-list.component.css']
    }),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        router_1.ActivatedRoute])
], TagsListComponent);
exports.TagsListComponent = TagsListComponent;
//# sourceMappingURL=tags-list.component.js.map