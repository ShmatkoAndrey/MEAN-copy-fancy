import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'popular-list',
    templateUrl: 'popular-list.component.html',
    styleUrls: ['popular-list.component.css']
})
export class PopularListComponent implements OnInit{
    products;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getPopularNum().then(products => this.products = products);
    }
}
