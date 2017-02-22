import { Component } from '@angular/core';

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
    // @Output() login = new EventEmitter();

    constructor(private userService: UserService) {}

    onSubmit() {
        this.userService.login({
            username: this.username,
            password: this.password
        });//.then(user => this.login.emit(user));
    }

}