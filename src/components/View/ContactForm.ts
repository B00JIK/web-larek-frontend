import { ensureAllElements, ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components"; 
import { IEvents } from "../base/events"; 
import { Form } from "./Form";
 
 
interface IContactForm { 
    formCloseButton: HTMLButtonElement; 
    formSubmitButton: HTMLButtonElement; 
    formInputList: HTMLInputElement[]; 
    formOrder: HTMLFormElement; 
    errors: HTMLElement; 
} 
 
export class ContactForm extends Form<IContactForm> { 
    protected _formCloseButton: HTMLButtonElement; 
    protected _formSubmitButton: HTMLButtonElement; 
    protected _formInputList: HTMLInputElement[]; 
    protected _errors: HTMLElement; 
 
    constructor(container: HTMLFormElement, protected events: IEvents) { 
        super(container); 
        
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container); 
        this._formInputList = ensureAllElements('.form__input', this.container) as HTMLInputElement[]; 

        this._formOrder.addEventListener('submit', (event) => { 
            event.preventDefault(); 
            this.events.emit('сontactForm: submit'); 
        }); 
        this._formInputList.forEach(item => { 
            item.addEventListener('input', (event) => { 
                const target = event.target as HTMLInputElement; 
                const field = target.name; 
                const value = target.value; 
                this.events.emit(`contact:changeContacts`, { field, value }); 
            }) 
        }) 
    } 
}