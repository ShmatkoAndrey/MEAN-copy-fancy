import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'store-page',
    templateUrl: 'store-page.component.html',
    styleUrls: ['store-page.component.css']
})
export class StorePageComponent implements OnInit{
    products;
    store;
    id;

    private sub: any;

    constructor(private productService: ProductService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.productService.getStoreProducts( params['id']).then(products => this.products = products);
            this.productService.getStore( params['id']).then(store => this.store = store).then(()=> console.log(this.store));

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
