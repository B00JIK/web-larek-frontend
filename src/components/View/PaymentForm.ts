import { IItemData } from "../../types"; 
import { ensureAllElements, ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components"; 
import { IEvents } from "../base/events"; 
import { Form } from "./Form";
 
interface IPaymentForm { 
    formCloseButton: HTMLButtonElement; 
    formSubmitButton: HTMLButtonElement; 
    paymentMethodButtonList: HTMLButtonElement[]; 
    formInput: HTMLInputElement; 
    formOrder: HTMLFormElement; 
    paymentMethod: string; 
    errors: HTMLElement; 
} 
 
export class PaymentForm extends Form<IPaymentForm> { 
 
    protected _formSubmitButton: HTMLButtonElement; 
    protected _paymentMethodButtonList: HTMLButtonElement[]; 
    protected _formInput: HTMLInputElement; 
    protected paymentMethod: string; 
    protected _errors: HTMLElement; 
 
 
    constructor(container: HTMLFormElement, protected events: IEvents) { 
        super(container); 
 
        this._errors = ensureElement<HTMLElement>('.form__errors', this._formOrder); 
        this._formInput = ensureElement('.form__input', this._formOrder) as HTMLInputElement; 
        this._paymentMethodButtonList = ensureAllElements('.button_alt', this._formOrder); 
 
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
        this._paymentMethodButtonList.forEach((item) => {
            this.toggleClass(item, 'button_alt-active', item.name === paymentMethod);
        });
    }
}