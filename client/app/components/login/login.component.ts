import { Component, Output, EventEmitter } from '@angular/core';

import  { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    @Output() onOff = new EventEmitter();

    constructor(private userService: UserService) {}

    onSubmit() {
        this.userService.login({
            username: this.username,
            password: this.password
        });//.then(user => this.login.emit(user));
    }

    onAuth() {
       this.userService.authFB();
       let interval = setInterval(function () {
            if(this.userService.user) clearInterval(interval);
       }.bind(this), 1000)
    }
}