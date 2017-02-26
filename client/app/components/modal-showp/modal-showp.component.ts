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

    onOff() {
        this.modalOff.emit();
    }

    ngOnInit() {
        this.main_img = this.product.mainPhoto;
    }

    showPhoto(photo) {
        this.main_img = photo;
    }

    contentClick() {

    }

}
