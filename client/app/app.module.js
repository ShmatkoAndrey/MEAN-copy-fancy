"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var header_component_1 = require("./components/header/header.component");
var tags_list_component_1 = require("./components/tags-list/tags-list.component");
var popular_component_1 = require("./components/popular/popular.component");
var product_list_component_1 = require("./components/product-list/product-list.component");
var product_component_1 = require("./components/product/product.component");
var login_component_1 = require("./components/login/login.component");
var registration_component_1 = require("./components/registration/registration.component");
var modal_lr_component_1 = require("./components/modal-lr/modal-lr.component");
var modal_np_component_1 = require("./components/modal-np/modal-np.component");
var modal_showp_component_1 = require("./components/modal-showp/modal-showp.component");
var cart_component_1 = require("./components/cart/cart.component");
var stores_component_1 = require("./components/stores/stores.component");
var popular_list_component_1 = require("./components/popular-list/popular-list.component");
var store_page_component_1 = require("./components/store-page/store-page.component");
var admin_main_component_1 = require("./components/admin-panel/admin-main/admin-main.component");
var users_ap_component_1 = require("./components/admin-panel/users-ap/users-ap.component");
var user_ap_component_1 = require("./components/admin-panel/user-ap/user-ap.component");
var product_service_1 = require("./services/product.service");
var user_service_1 = require("./services/user.service");
var cart_service_1 = require("./services/cart.service");
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
            http_1.HttpModule,
            app_routes_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            header_component_1.HeaderComponent,
            tags_list_component_1.TagsListComponent,
            popular_component_1.PopularComponent,
            product_list_component_1.ProductListComponent,
            product_component_1.ProductComponent,
            login_component_1.LoginComponent,
            registration_component_1.RegistrationComponent,
            modal_lr_component_1.ModalLogRegComponent,
            modal_np_component_1.ModalNewProductComponent,
            modal_showp_component_1.ModalShowProductComponent,
            cart_component_1.CartComponent,
            stores_component_1.StoresComponent,
            popular_list_component_1.PopularListComponent,
            store_page_component_1.StorePageComponent,
            admin_main_component_1.AdminMainComponent,
            users_ap_component_1.UsersAdminPanelComponent,
            user_ap_component_1.UserAdminPanelComponent
        ],
        providers: [app_routes_1.appRoutingProviders, product_service_1.ProductService, user_service_1.UserService, cart_service_1.CartService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map