import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'stores',
    templateUrl: 'stores.component.html',
    styleUrls: ['stores.component.css']
})
export class StoresComponent implements OnInit {
    stores = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getStores().then(stores => this.stores = stores);
    }

}