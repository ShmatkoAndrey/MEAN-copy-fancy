"use strict";
var router_1 = require("@angular/router");
var product_list_component_1 = require("./components/product-list/product-list.component");
var popular_list_component_1 = require("./components/popular-list/popular-list.component");
exports.routes = [
    { path: '', component: product_list_component_1.ProductListComponent, pathMatch: 'full' },
    { path: 'popular', component: popular_list_component_1.PopularListComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map