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
    imageAvatarSrc;
    avatar;
    imageBanner;
    banner;

    constructor(private userService: UserService) {}

    onSubmit() {
        this.userService.registration({
                username: this.username,
                password: this.password,
                password_confirmation: this.password_confirmation,
                store: this.store || false,
                admin: this.admin || false,
                avatar: this.avatar,
                banner: this.banner
            }
        );
    }

    onChangeAvatar(e) {
        let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        let pattern = /image-*/;
        let reader = new FileReader();
        if (!file.type.match(pattern)) {
            console.log('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoadedAvatar.bind(this);
        reader.readAsDataURL(file);
        this.avatar = file;
    }

    _handleReaderLoadedAvatar(e) {
        let reader = e.target;
        this.imageAvatarSrc = reader.result;
    }

    onChangeBanner(e) {
        let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        let pattern = /image-*/;
        let reader = new FileReader();
        if (!file.type.match(pattern)) {
            console.log('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoadedBanner.bind(this);
        reader.readAsDataURL(file);
        this.banner = file;
    }

    _handleReaderLoadedBanner(e) {
        let reader = e.target;
        this.imageBanner = reader.result;
    }

}