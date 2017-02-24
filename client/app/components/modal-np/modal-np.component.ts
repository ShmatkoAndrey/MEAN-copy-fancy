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
    descriptionPhoto = [];
    imageMainSrc;
    imageDescriptionSrc: string[] = [];

    constructor(private productSetvice: ProductService) {}

    onOff() {
        this.modalOff.emit();
    }

    onSubmit() {
        // this.productSetvice.createNewProduct({ title: this.title, description: this.description, price: this.price, tags: this.tags.split(' ') })
    }

    onChangeMain(e) {
        let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        let pattern = /image-*/;
        let reader = new FileReader();
        if (!file.type.match(pattern)) {
            console.log('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoadedMain.bind(this);
        reader.readAsDataURL(file);
        this.mainPhoto = file;
    }

    _handleReaderLoadedMain(e) {
        let reader = e.target;
        this.imageMainSrc = reader.result;
    }

    onChangeDescription(e) {
        this.descriptionPhoto = [];
        this.imageDescriptionSrc = [];

        let files = e.target.files;
        let files_arr = Object.keys(files).map(function (key) { return files[key]; });

        files_arr.forEach(function (file) {
            let pattern = /image-*/;
            let reader = new FileReader();
            if (!file.type.match(pattern)) {
                console.log('invalid format');
                return;
            }
            reader.onload = this._handleReaderLoadedDescription.bind(this);
            reader.readAsDataURL(file);
            this.descriptionPhoto.push(file);
        }.bind(this));
    }

    _handleReaderLoadedDescription(e) {
        let reader = e.target;
        this.imageDescriptionSrc.push(reader.result);
    }
}
