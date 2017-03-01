import { Component } from '@angular/core';

import { ProductService } from './services/product.service'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  load_posts = false;

  constructor(private productService: ProductService) {}

  onScroll(event) {
    if(!this.load_posts) {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 400) {
        this.load_posts = true;
        this.productService.getProducts().then(() => this.load_posts = false);
      }
    }
  }
}
