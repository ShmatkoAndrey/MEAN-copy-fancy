import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-ap',
    templateUrl: 'user-ap.component.html',
    styleUrls: ['user-ap.component.css']
})
export class UserAdminPanelComponent implements OnInit{
    @Input() user;
    admin;
    store;

    ngOnInit() {
        this.admin = this.user.admin;
        this.store = this.user.store;
    }

    constructor(private userService: UserService) {}

    onSubmit() {
        this.userService.updateUser({ _id: this.user._id,admin: this.admin, store: this.store }).then((user) => { this.admin = user.admin; this.store = user.store; this.user = user;});
    }

}
