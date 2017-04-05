import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent }   from './components/product-list/product-list.component';
import { PopularListComponent }   from './components/popular-list/popular-list.component';
import { TagsListComponent }   from './components/tags-list/tags-list.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent, pathMatch: 'full' },
    { path: 'popular', component: PopularListComponent },
    { path: 'tag/:name', component: TagsListComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);