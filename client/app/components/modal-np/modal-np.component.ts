import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
    moduleId: module.id,
    selector: 'modal-np',
    templateUrl: 'modal-np.component.html',
    styleUrls: ['modal-np.component.css']
})
export class ModalNewProductComponent {
    @Input() show_modal: boolean;
    @Output() modalOff = new EventEmitter();

    title: string;
    description: string;
    price: string;
    tags: string;
    mainPhoto;
    descriptionPhoto;

    constructor(private productSetvice: ProductService) {}

    onOff() {
        this.modalOff.emit();
    }

    onSubmit() {
        console.log(this.mainPhoto);
        // this.productSetvice.createNewProduct({ title: this.title, description: this.description, price: this.price, tags: this.tags.split(' ') })
    }
}
