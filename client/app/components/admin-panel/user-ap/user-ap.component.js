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
var user_service_1 = require("../../../services/user.service");
var UserAdminPanelComponent = (function () {
    function UserAdminPanelComponent(userService) {
        this.userService = userService;
    }
    UserAdminPanelComponent.prototype.ngOnInit = function () {
        this.admin = this.user.admin;
        this.store = this.user.store;
    };
    UserAdminPanelComponent.prototype.onSubmit = function () {
        var _this = this;
        this.userService.updateUser({ _id: this.user._id, admin: this.admin, store: this.store }).then(function (user) { _this.admin = user.admin; _this.store = user.store; _this.user = user; });
    };
    return UserAdminPanelComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UserAdminPanelComponent.prototype, "user", void 0);
UserAdminPanelComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-ap',
        templateUrl: 'user-ap.component.html',
        styleUrls: ['user-ap.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserAdminPanelComponent);
exports.UserAdminPanelComponent = UserAdminPanelComponent;
//# sourceMappingURL=user-ap.component.js.map