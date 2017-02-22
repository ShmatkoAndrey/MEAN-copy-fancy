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

    private handleError(err: any) {
        console.error('Error:', err);
        return Promise.reject(err.message || err);
    }
}