import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { HeaderComponent }   from './components/header/header.component';
import { TagsListComponent }   from './components/tags-list/tags-list.component';
import { PopularComponent }   from './components/popular/popular.component';
import { ProductListComponent }   from './components/product-list/product-list.component';
import { ProductComponent }   from './components/product/product.component';
import { LoginComponent }   from './components/login/login.component';
import { RegistrationComponent }   from './components/registration/registration.component';

import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule
  ],

  declarations: [
      AppComponent,
      HeaderComponent,
      TagsListComponent,
      PopularComponent,
      ProductListComponent,
      ProductComponent,
      LoginComponent,
      RegistrationComponent
  ],

  providers: [ ProductService, UserService ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
