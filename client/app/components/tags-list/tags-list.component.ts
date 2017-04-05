import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'tags-list',
    templateUrl: 'tags-list.component.html',
    styleUrls: ['tags-list.component.css']
})
export class TagsListComponent implements OnInit, OnDestroy{
    products;
    private sub: any;

    constructor(private productService: ProductService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.productService.getByTag( params['name']).then(products => this.products = products);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
