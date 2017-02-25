import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
})
export class ProductComponent {
    @Input() product;
    show_modal = false;

    formatDate(date) {
        let d = new Date();
        d.setTime(Date.parse(date));

        let monthNames = [
            "Jan", "Feb", "March",
            "April", "May", "June", "July",
            "August", "Sept", "Oc",
            "Nov", "Dec"
        ];

        let day = d.getDate();
        let monthIndex = d.getMonth();
        let year = d.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    modalOn() {
        this.show_modal = true;
    }

    modalOff() {
        this.show_modal = false;
    }

}