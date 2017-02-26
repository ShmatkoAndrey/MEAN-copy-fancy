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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
    }
    ProductService.prototype.getProducts = function () {
        var _this = this;
        return this.http.get('/api/products')
            .toPromise()
            .then(function (res) { return res.json().products; })
            .then(function (products) { return _this.products = products.reverse(); })
            .catch(this.handleError);
    };
    ProductService.prototype.createNewProduct = function (product) {
        var _this = this;
        var data = new FormData();
        data.append('title', product.title);
        data.append('description', product.description);
        data.append('price', product.price);
        data.append('tags', product.tags);
        data.append('mainPhoto', product.mainPhoto);
        product.descriptionPhoto.forEach(function (e, i) {
            data.append('descriptionPhoto[' + i + ']', e);
        });
        return this.http.post('/api/products', data)
            .toPromise()
            .then(function (res) { return res.json().product; })
            .then(function (product) { return _this.products.unshift(product); })
            .catch(this.handleError);
    };
    ProductService.prototype.like = function (product) {
        var _this = this;
        return this.http.get('/api/products/like/' + product._id)
            .toPromise()
            .then(function (res) { return res.json().product; })
            .then(function (product) {
            var index = _this.findIndexById(product._id);
            if (index > -1) {
                _this.products[index] = product;
            }
        })
            .catch(this.handleError);
    };
    ProductService.prototype.handleError = function (err) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    };
    ProductService.prototype.findIndexById = function (id) {
        var index = -1;
        this.products.forEach(function (e, i) {
            if (e._id == id) {
                index = i;
                return index;
            }
        });
        return index;
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map