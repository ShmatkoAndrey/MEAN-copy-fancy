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
var user_service_1 = require("../../services/user.service");
var LoginComponent = (function () {
    function LoginComponent(userService) {
        this.userService = userService;
        this.username = '';
        this.password = '';
        this.onOff = new core_1.EventEmitter();
    }
    LoginComponent.prototype.onSubmit = function () {
        this.userService.login({
            username: this.username,
            password: this.password
        }); //.then(user => this.login.emit(user));
    };
    LoginComponent.prototype.onAuth = function () {
        this.userService.authFB();
        var interval = setInterval(function () {
            if (this.userService.user)
                clearInterval(interval);
        }.bind(this), 1000);
    };
    return LoginComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "onOff", void 0);
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map