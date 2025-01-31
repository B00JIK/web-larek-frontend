import { IItemData } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { IEvents } from "../base/events";

interface IPaymentForm {
    formCloseButton: HTMLButtonElement;
    formSubmitButton: HTMLButtonElement;
    paymentMethodButtonList: HTMLButtonElement[];
    formInput: HTMLInputElement;
    formOrder: HTMLFormElement;
    paymentMethod: string;
    errors: HTMLElement;
}

export class PaymentForm extends Component<IPaymentForm> {

    protected _formSubmitButton: HTMLButtonElement;
    protected _paymentMethodButtonList: HTMLButtonElement[];
    protected _formInput: HTMLInputElement;
    protected _formOrder: HTMLFormElement;
    protected paymentMethod: string;
    protected _errors: HTMLElement;


    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._formOrder = container;
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this._formSubmitButton = ensureElement('.order__button', this.container) as HTMLButtonElement;
        this._formInput = ensureElement('.form__input', this.container) as HTMLInputElement;
        this._paymentMethodButtonList = ensureAllElements('.button_alt', this.container);

        this._formOrder.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('paymentForm: submit');
        });
        this._formOrder.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`order:changeAddress`, { field, value });
          });
        this._paymentMethodButtonList.forEach(item => { 
            item.addEventListener('click', () => { 
                this.paymentMethod = item.name;      
                events.emit('paymentForm: choosePaymentMethod', item);
            });
        });
    }

    set choosePaymentMethod(paymentMethod: string) {
        this._paymentMethodButtonList.forEach(item => {
            if(item.name === paymentMethod) {
                item.classList.add('button_alt-active');
            } else {
                item.classList.remove('button_alt-active');
            }
        })
    }

    set valid(value: boolean) {
        this._formSubmitButton.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render() {
        return this._formOrder;
    }
}