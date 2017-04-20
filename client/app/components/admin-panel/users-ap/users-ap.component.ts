import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'users-ap',
    templateUrl: 'users-ap.component.html',
    styleUrls: ['users-ap.component.css']
})
export class UsersAdminPanelComponent implements OnInit{

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUsers();
    }

}
