import { Component } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})
export class RegistrationComponent {
    username: string = '';
    password: string = '';
    password_confirmation: string = '';
    // @Output() login = new EventEmitter();

    constructor(private userService: UserService) {}

    onSubmit() {
        this.userService.registration({
            username: this.username,
            password: this.password,
            password_confirmation: this.password_confirmation }
        );//.then(user => this.login.emit(user));
    }

}