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
    show_LR_modal:boolean = false;
    show_NP_modal:boolean = false;
    show_cart:boolean = false;

    constructor(private userService: UserService ) {}

    ngOnInit() {
        this.userService.getCurrentUser().then(user => this.user=user);
    }

    modalLROn() {
        this.show_LR_modal = true;
    }

    modalLROff() {
        this.show_LR_modal = false;
    }

    switchLogin(il) {
        this.isLogin = il;
    }

    logout() {
        this.show_LR_modal = false;
        this.userService.logout().then(user => this.user=user);
    }

    modaNPOn() {
        this.show_NP_modal = true;
    }

    modalNPOff() {
        this.show_NP_modal = false;
    }

    openCart() {
        this.show_cart = !this.show_cart;
    }


}