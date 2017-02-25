import  { Injectable } from '@angular/core';
import  { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProductService {
    products;

    constructor(private http: Http) {}

    getProducts() {
        return this.http.get('/api/products')
            .toPromise()
            .then(res => res.json().products)
            .then(products => this.products = products.reverse())
            .catch(this.handleError);
    }

    createNewProduct(product: any) {
        let data: FormData = new FormData();
        data.append('title', product.title);
        data.append('description', product.description);
        data.append('price', product.price);
        data.append('tags', product.tags);
        data.append('mainPhoto', product.mainPhoto);
        product.descriptionPhoto.forEach(function (e, i) {
            data.append('descriptionPhoto['+ i +']', e);
        });

        return this.http.post('/api/products', data)
            .toPromise()
            .then(res => res.json().product)
            .then(product => this.products.unshift(product))
            .catch(this.handleError);
    }


    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }
}