import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'modal-lr',
    templateUrl: 'modal-lr.component.html',
    styleUrls: ['modal-lr.component.css']
})
export class ModalLogRegComponent {

    @Input() show_modal: boolean;
    @Input() isLogin: boolean;
    @Output() modalOff = new EventEmitter();
    @Output() switchLogin = new EventEmitter();

    onOff() {
        this.modalOff.emit();
    }

    onSwitch(flag) {
        this.switchLogin.emit(flag);
    }

}