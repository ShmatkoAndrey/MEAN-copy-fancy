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
    store: boolean = false;
    admin: boolean = false;

    constructor(private userService: UserService) {}

    onSubmit() {
        this.userService.registration({
                username: this.username,
                password: this.password,
                password_confirmation: this.password_confirmation,
                store: this.store || false,
                admin: this.admin || false
            }
        );
    }

}