import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import {gunzip} from "zlib";

@Component({
    moduleId: module.id,
    selector: 'cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css']
})
export class CartComponent implements OnInit{
    cart;

    constructor(private cartService: CartService) {}

    ngOnInit(){
        this.cart = this.cartService.getCart();
    }

    getSum() {
        let sum = 0;
        this.cart.forEach(function (e) {
            sum += e.price;
        });
        return sum;
    }


}
