import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent }   from './components/product-list/product-list.component';
import { PopularListComponent }   from './components/popular-list/popular-list.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent, pathMatch: 'full' },
    { path: 'popular', component: PopularListComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);