import  { Injectable } from '@angular/core';
import  { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
    user = {};

    constructor(private http: Http) {}

    getCurrentUser() {
        return this.http.get('/api/current_user')
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = user)
            .catch(this.handleError);
    }

    login(user: any) {
        let data = new URLSearchParams();
        data.append('login', user.username);
        data.append('password', user.password);

        return this.http.post('/api/login', data)
            .toPromise()
            .then(res => res.json().user)
            .then(user => this.user = user)
            .catch(this.handleError);
    }

    registration(user: any) {
        let data = new URLSearchParams();
        data.append('username', user.username);
        data.append('password', user.password);
        data.append('password_confirmation', user.password_confirmation);

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


    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }
}