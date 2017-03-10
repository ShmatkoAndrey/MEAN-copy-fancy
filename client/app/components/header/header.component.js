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
var user_service_1 = require("../../services/user.service");
var HeaderComponent = (function () {
    function HeaderComponent(userService) {
        this.userService = userService;
        this.show_LR_modal = false;
        this.show_NP_modal = false;
        this.show_cart = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCurrentUser().then(function (user) { return _this.user = user; });
    };
    HeaderComponent.prototype.modalLROn = function () {
        this.show_LR_modal = true;
    };
    HeaderComponent.prototype.modalLROff = function () {
        this.show_LR_modal = false;
    };
    HeaderComponent.prototype.switchLogin = function (il) {
        this.isLogin = il;
    };
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        this.show_LR_modal = false;
        this.userService.logout().then(function (user) { return _this.user = user; });
    };
    HeaderComponent.prototype.modaNPOn = function () {
        this.show_NP_modal = true;
    };
    HeaderComponent.prototype.modalNPOff = function () {
        this.show_NP_modal = false;
    };
    HeaderComponent.prototype.openCart = function () {
        this.show_cart = !this.show_cart;
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'fancy-header',
        templateUrl: 'header.component.html',
        styleUrls: ['header.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map