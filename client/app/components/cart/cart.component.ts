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
    show_cart:boolean = false;

    constructor(private cartService: CartService) {}

    ngOnInit(){
        this.cart = this.cartService.getCart();
    }

    openCart() {
        this.show_cart = !this.show_cart;
    }

    getSum() {
        let sum = 0;
        this.cart.forEach(function (e) {
            sum += e.price;
        });
        return sum;
    }

    onPay() {
        this.cartService.payment();
    }



}
