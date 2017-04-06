import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routes';

import { AppComponent }   from './app.component';
import { HeaderComponent }   from './components/header/header.component';
import { TagsListComponent }   from './components/tags-list/tags-list.component';
import { PopularComponent }   from './components/popular/popular.component';
import { ProductListComponent }   from './components/product-list/product-list.component';
import { ProductComponent }   from './components/product/product.component';
import { LoginComponent }   from './components/login/login.component';
import { RegistrationComponent }   from './components/registration/registration.component';
import { ModalLogRegComponent }   from './components/modal-lr/modal-lr.component';
import { ModalNewProductComponent }   from './components/modal-np/modal-np.component';
import { ModalShowProductComponent }   from './components/modal-showp/modal-showp.component';
import { CartComponent }   from './components/cart/cart.component';
import { StoresComponent }   from './components/stores/stores.component';
import { PopularListComponent }   from './components/popular-list/popular-list.component';
import { StorePageComponent }   from './components/store-page/store-page.component';

import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing
  ],
  declarations: [
      AppComponent,
      HeaderComponent,
      TagsListComponent,
      PopularComponent,
      ProductListComponent,
      ProductComponent,
      LoginComponent,
      RegistrationComponent,
      ModalLogRegComponent,
      ModalNewProductComponent,
      ModalShowProductComponent,
      CartComponent,
      StoresComponent,
      PopularListComponent,
      StorePageComponent
  ],

  providers: [ appRoutingProviders, ProductService, UserService, CartService ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
