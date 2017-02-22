"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/header/header.component");
var tags_list_component_1 = require("./components/tags-list/tags-list.component");
var popular_component_1 = require("./components/popular/popular.component");
var product_list_component_1 = require("./components/product-list/product-list.component");
var product_component_1 = require("./components/product/product.component");
var login_component_1 = require("./components/login/login.component");
var registration_component_1 = require("./components/registration/registration.component");
var product_service_1 = require("./services/product.service");
var user_service_1 = require("./services/user.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            tags_list_component_1.TagsListComponent,
            popular_component_1.PopularComponent,
            product_list_component_1.ProductListComponent,
            product_component_1.ProductComponent,
            login_component_1.LoginComponent,
            registration_component_1.RegistrationComponent
        ],
        providers: [product_service_1.ProductService, user_service_1.UserService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map