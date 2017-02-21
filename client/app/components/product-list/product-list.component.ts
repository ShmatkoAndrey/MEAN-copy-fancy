import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'product-list',
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit{

    products;

    constructor(private productSrtvice: ProductService) {}

    ngOnInit(){
        this.productSrtvice.getProducts().then(products => this.products = products);
    }

}