import  { Injectable } from '@angular/core';
import  { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProductService {
    products;

    constructor(private http: Http) {}

    getProducts() {
        return this.http.get('/api/products')
            .toPromise()
            .then(res => res.json().products)
            .then(products => this.products = products)
            .catch(this.handleError);
    }


    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }
}