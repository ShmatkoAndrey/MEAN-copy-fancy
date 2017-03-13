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
// let fb = require('../../fb');
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getCurrentUser = function () {
        var _this = this;
        return this.http.get('/api/current_user')
            .toPromise()
            .then(function (res) { return res.json().user; })
            .then(function (user) { return _this.user = user; })
            .catch(this.handleError);
    };
    UserService.prototype.login = function (user) {
        var _this = this;
        var data = new http_1.URLSearchParams();
        data.append('username', user.username);
        data.append('password', user.password);
        return this.http.post('/api/login', data)
            .toPromise()
            .then(function (res) { return res.json().user; })
            .then(function (user) { return _this.user = user; })
            .catch(this.handleError);
    };
    UserService.prototype.registration = function (user) {
        var _this = this;
        var data = new FormData();
        data.append('username', user.username);
        data.append('password', user.password);
        data.append('password_confirmation', user.password_confirmation);
        data.append('store', user.store);
        data.append('admin', user.admin);
        data.append('avatar', user.avatar);
        return this.http.post('/api/registration', data)
            .toPromise()
            .then(function (res) { return res.json().user; })
            .then(function (user) { return _this.user = user; })
            .catch(this.handleError);
    };
    UserService.prototype.logout = function () {
        var _this = this;
        return this.http.get('/api/logout')
            .toPromise()
            .then(function (res) { return res.json().user; })
            .then(function (user) { return _this.user = null; })
            .catch(this.handleError);
    };
    UserService.prototype.getStores = function () {
        return this.http.get('/api/stores/products')
            .toPromise()
            .then(function (res) { return res.json().stores; })
            .catch(this.handleError);
    };
    UserService.prototype.auth = function (res, provider) {
        var _this = this;
        var data = new http_1.URLSearchParams();
        data.append('name', res.name);
        data.append('uid', res.id);
        data.append('provider', provider);
        this.http.post('/api/auth', data)
            .toPromise()
            .then(function (res) { return res.json().user; })
            .then(function (user) { return _this.user = user; })
            .catch(this.handleError);
    };
    UserService.prototype.authFB = function () {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                this.loginFB();
            }
            else {
                FB.login(function () {
                    this.loginFB();
                }.bind(this), { scope: 'public_profile,email' });
            }
        }.bind(this));
    };
    UserService.prototype.loginFB = function () {
        FB.api('/me', { fields: '' }, function (response) {
            this.auth(response, 'facebook');
        }.bind(this));
    };
    UserService.prototype.handleError = function (err) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map