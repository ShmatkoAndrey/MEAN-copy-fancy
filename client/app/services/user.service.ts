import  { Injectable } from '@angular/core';
import  { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise'
declare let FB;
// let fb = require('../../fb');

@Injectable()
export class UserService {
    user;

    constructor(private http: Http) {}

    getCurrentUser(): Promise<any> {
        return this.http.get('/api/current_user')
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = user)
            .catch(this.handleError);
    }

    login(user: any) {
        let data = new URLSearchParams();
        data.append('username', user.username);
        data.append('password', user.password);

        return this.http.post('/api/login', data)
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = user)
            .catch(this.handleError);
    }

    registration(user: any) {
        let data: FormData = new FormData();
        data.append('username', user.username);
        data.append('password', user.password);
        data.append('password_confirmation', user.password_confirmation);
        data.append('store', user.store);
        data.append('admin', user.admin);
        data.append('avatar', user.avatar);

        return this.http.post('/api/registration', data)
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = user)
            .catch(this.handleError);
    }

    logout() {
        return this.http.get('/api/logout')
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = null)
            .catch(this.handleError);
    }

    getStores() {
        return this.http.get('/api/stores/products')
            .toPromise()
            .then(res => res.json().stores)
            .catch(this.handleError);
    }

    auth(res, provider) {
        let data = new URLSearchParams();
        data.append('name', res.name);
        data.append('uid', res.id);
        data.append('provider', provider);

        this.http.post('/api/auth', data)
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = user)
            .catch(this.handleError);
    }

    authFB() {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                this.loginFB();
            }
            else {
                FB.login(function () {
                    this.loginFB();
                }.bind(this), {scope: 'public_profile,email'});
            }
        }.bind(this));
    }

    private loginFB() {
        FB.api('/me', {fields: ''}, function (response) {
            this.auth(response, 'facebook');
        }.bind(this));
    }

    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }
}