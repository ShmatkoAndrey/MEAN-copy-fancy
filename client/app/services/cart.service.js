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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var CartService = (function () {
    function CartService(http) {
        this.http = http;
        this.cart = [];
    }
    CartService.prototype.getCart = function () {
        var c = this.getCookie('cart');
        if (c) {
            this.cart = JSON.parse(c);
        }
        return this.cart;
    };
    CartService.prototype.addToCart = function (product) {
        this.cart.push({ title: product.title, price: product.price, _id: product._id });
        this.setCookie('cart', this.cart, { expires: 36000 });
    };
    CartService.prototype.deleteCart = function () {
        this.deleteCookie("cart");
        this.cart = [];
    };
    CartService.prototype.payment = function () {
        var cart, c = this.getCookie('cart');
        if (c) {
            cart = JSON.parse(c);
        }
        var a = cart.map(function (e) {
            return e._id;
        });
        var data = new http_1.URLSearchParams();
        data.append('products', a.join(' '));
        return this.http.post('/api/payment', data)
            .toPromise()
            .then(function (res) { return res.json().charge; })
            .then(function (charge) { return console.log(charge); })
            .catch(this.handleError);
    };
    CartService.prototype.handleError = function (err) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    };
    CartService.prototype.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    CartService.prototype.setCookie = function (name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = JSON.stringify(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    };
    CartService.prototype.deleteCookie = function (name) {
        this.setCookie(name, "", {
            expires: -1
        });
    };
    return CartService;
}());
CartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map