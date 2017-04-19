import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'fancy-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{
    isLogin: boolean;
    show_LR_modal:boolean = false;
    show_NP_modal:boolean = false;

    @Output() onAdmin = new EventEmitter();

    constructor(private userService: UserService, private router: Router ) {}

    ngOnInit() {
        this.userService.getCurrentUser();
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
        this.userService.logout();
    }

    modaNPOn() {
        this.show_NP_modal = true;
    }

    modalNPOff() {
        this.show_NP_modal = false;
    }

    adminPanelOn() {
        this.onAdmin.emit();
        this.router.navigate(['/admin']);
    }
}