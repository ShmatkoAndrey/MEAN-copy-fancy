import  { Injectable } from '@angular/core';
import  { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProductService {
    products = [];
    n_start = 0;
    n = 5;
    last = "product";

    constructor(private http: Http) {}

    continueProducts() {

        if(this.last.split(' ')[0] == 'product') { return this.getProducts() }
        if(this.last.split(' ')[0] == 'popular') { return this.getPopularNum() }
        if(this.last.split(' ')[0] == 'tag') { return this.getByTag(this.last.split(' ')[1]) }

    }

    getProducts() {
        if(this.last != "product") {
            this.n_start = 0;
            this.last = "product";
            this.products = [];
        }
        return this.http.get('/api/products/'+ this.n_start + '/' + this.n)
            .toPromise()
            .then(res => res.json().products)
            .then(products => {
                this.products = this.products.concat(products);
                this.n_start += this.n;
            })
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
            .then(res => res.json())
            .then(product => {
                if(product.error){
                    alert(product.error);
                }
                else {
                    this.products.unshift(product)
                }
            })
            .catch(this.handleError);
    }

    like(product) {
        return this.http.get('/api/like/' + product._id)
            .toPromise()
            .then(res => res.json().product)
            .then(product => {
                console.log(product);
                let index = this.findIndexById(product._id);
                if (index > -1) {
                    this.products[index] = product;
                }
            })
            .catch(this.handleError);
    }

    getPopular() {
        return this.http.get('/api/popular/0/9')
            .toPromise()
            .then(res => res.json().products)
            .catch(this.handleError);
    }

    getPopularNum() {
        if(this.last != "popular") {
            this.n_start = 0;
            this.last = "popular";
            this.products = [];
        }
        return this.http.get('/api/popular/'+ this.n_start + '/' + this.n)
            .toPromise()
            .then(res => res.json().products)
            .then(products => {
                this.products = this.products.concat(products);
                this.n_start += this.n;
            })
            .catch(this.handleError);
    }

    getByTag(name){
        if(this.last != "tag " + name) {
            this.n_start = 0;
            this.last = "tag " + name;
            this.products = [];
        }

        return this.http.get('/api/tag/' + name + '/' + this.n_start + '/' + this.n)
            .toPromise()
            .then(res => res.json().products)
            .then(products => {
                this.products = this.products.concat(products);
                this.n_start += this.n;
            })
            .catch(this.handleError);

    }



    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }

    private findIndexById(id): number {
        let index = -1;
        this.products.forEach(function (e, i) {
            if(e._id == id) {
                index = i;
                return index;
            }
        });
        return index;
    }
}