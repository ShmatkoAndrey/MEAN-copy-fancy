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
var RegistrationComponent = (function () {
    function RegistrationComponent(userService) {
        this.userService = userService;
        this.username = '';
        this.password = '';
        this.password_confirmation = '';
        this.store = false;
        this.admin = false;
    }
    RegistrationComponent.prototype.onSubmit = function () {
        this.userService.registration({
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation,
            store: this.store || false,
            admin: this.admin || false,
            avatar: this.avatar
        });
    };
    RegistrationComponent.prototype.onChangeAvatar = function (e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            console.log('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoadedMain.bind(this);
        reader.readAsDataURL(file);
        this.avatar = file;
    };
    RegistrationComponent.prototype._handleReaderLoadedMain = function (e) {
        var reader = e.target;
        this.imageAvatarSrc = reader.result;
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'registration',
        templateUrl: 'registration.component.html',
        styleUrls: ['registration.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map