import  { Injectable } from '@angular/core';
import  { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class CartService {
    cart = [];

    constructor(private http: Http) {}

    getCart() {
        console.log(document.cookie);
        let c = this.getCookie('cart');
        if(c) {
            this.cart = JSON.parse(c);
        }
        return this.cart;
    }

    addToCart(product) {
        this.cart.push({title: product.title, price: product.price, _id: product._id});
        this.setCookie('cart', this.cart, {expires: 36000});
    }

    deleteFromCart(product) {

    }



    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }

    private getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    private setCookie(name, value, options) {
        options = options || {};

        let expires = options.expires;

        if (typeof expires == "number" && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = JSON.stringify(value);

        let updatedCookie = name + "=" + value;

        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    private deleteCookie(name) {
        this.setCookie(name, "", {
            expires: -1
        })
    }
}