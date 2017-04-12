import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'modal-showp',
    templateUrl: 'modal-showp.component.html',
    styleUrls: ['modal-showp.component.css', 'product.component.css']
})
export class ModalShowProductComponent implements OnInit{
    @Input() show_modal: boolean;
    @Input() product;
    @Output() modalOff = new EventEmitter();
    main_img;
    all_imgs = [];

    onOff() {
        this.modalOff.emit();
    }

    ngOnInit() {
        this.main_img = this.product.mainPhoto;
        this.all_imgs.push(this.product.mainPhoto);
        this.all_imgs = this.all_imgs.concat(this.product.descriptionPhoto);

        this.show_modal = false;
    }

    showPhoto(photo) {
        this.main_img = photo;
    }

    PrevPhoto() {
        let i = this.all_imgs.indexOf(this.main_img);
        if(i == 0) i = this.all_imgs.length - 1;
        else i--;

        this.main_img = this.all_imgs[i];
    }

    NextPhoto() {
        let i = this.all_imgs.indexOf(this.main_img);
        if(i == this.all_imgs.length - 1) i = 0;
        else i++;
        this.main_img = this.all_imgs[i];
    }

}
