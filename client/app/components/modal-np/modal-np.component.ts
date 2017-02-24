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

    constructor(private productSrtvice: ProductService) {}

    onOff() {
        this.modalOff.emit();
    }
}
