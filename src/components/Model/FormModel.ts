import { FormErrors, IOrderForm } from "../../types";
import { IEvents } from "../base/events";



export class FormModel {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    formErrors: FormErrors = {};

    constructor(protected events: IEvents) {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.total = 0;
        this.items = [];
      }
    
    setOrderAddress(field: string, value: string) {
        this.address = value;
        if (this.validateAddress()) {
            this.events.emit('order:ready', this.getOrder());
        }
    }

    setOrderPayment(value: string) {
        this.payment = value;
        if (this.validateAddress()) {
            this.events.emit('order:ready', this.getOrder());
        }
    }

    setOrderContacts(field: string, value: string) {
        if (field === 'email') {
            this.email = value;
        }
        if (field === 'phone') {
            this.phone = value;
        }
        if (this.validateContacts()) {
            this.events.emit('order:ready', this.getOrder());
        }
    }

    validateAddress() {
        const errors: typeof this.formErrors = {};
        if (!this.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.payment) {
            console.log(!this.payment)
            errors.payment = 'Выберите способ оплаты';
        }
        this.formErrors = errors;
        this.events.emit('formErrorsPayment:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContacts() {
        const errors: typeof this.formErrors = {};
        const regexp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;
        if (!this.email) {
            errors.email = 'Необходимо указать email';
        } else if (!regexp.test(this.address)) {
            errors.address = 'Укажите настоящий адрес'
        }
        if (!this.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
            total: this.total,
            items: this.items,
        }
    }
}