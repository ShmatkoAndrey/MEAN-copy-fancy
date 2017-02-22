import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'modal-lr',
    templateUrl: 'modal-lr.component.html',
    styleUrls: ['modal-lr.component.css']
})
export class ModalLogRegComponent {

    @Input() show_modal: boolean;
    @Output() modalOff = new EventEmitter();

    onOff() {
        this.modalOff.emit();
    }

}