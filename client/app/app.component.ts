import { Component } from '@angular/core';

import { ProductService } from './services/product.service'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  adminPanel = false;
  load_posts = false;

  constructor(private productService: ProductService) {}

  onScroll(event) {
    if(this.load_posts && (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight )) {
      this.load_posts = false;
    }

    if(!this.load_posts) {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 400) {
        this.load_posts = true;
        this.productService.continueProducts().then(() => this.load_posts = false);
      }
    }
  }

  onAdminPanelOn() {
    this.adminPanel = true;
  }
}
