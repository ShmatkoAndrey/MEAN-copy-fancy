import { Component, OnInit } from '@angular/core';

import  {ProductService} from '../../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'popular',
    templateUrl: 'popular.component.html',
    styleUrls: ['popular.component.css']
})
export class PopularComponent {
    popular = [];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getPopular().then(popular => this.popular = popular);
    }
}