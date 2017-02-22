import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'fancy-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{
    user;
    isLogin: boolean;
    show_modal:boolean = false;

    constructor(private userService: UserService ) {}

    ngOnInit() {
        this.userService.getCurrentUser().then(user => this.user=user);
    }

    modalOn() {
        this.show_modal = true;
    }

    modalOff() {
        this.show_modal = false;
    }

    switchLogin(il) {
        this.isLogin = il;
    }

    logout() {
        this.show_modal = false;
        this.userService.logout().then(user => this.user=user);
    }

}