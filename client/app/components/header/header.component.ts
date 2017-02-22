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

    constructor(private userService: UserService ) {}

    ngOnInit() {
        this.userService.getCurrentUser().then(user => this.user = user);
    }

}