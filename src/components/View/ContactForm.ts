import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { IEvents } from "../base/events";


interface IContactForm {
    formCloseButton: HTMLButtonElement;
    formSubmitButton: HTMLButtonElement;
    formInputList: HTMLInputElement[];
    formOrder: HTMLFormElement;
    errors: HTMLElement;
}

export class ContactForm extends Component<IContactForm> {
    protected _formCloseButton: HTMLButtonElement;
    protected _formSubmitButton: HTMLButtonElement;
    protected _formInputList: HTMLInputElement[];
    protected _formOrder: HTMLFormElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this._formSubmitButton = ensureElement('.contact__action__button', this.container) as HTMLButtonElement;
        this._formCloseButton = ensureElement('.contact__close__button', this.container) as HTMLButtonElement;
        this._formInputList = ensureAllElements('.form__input', this.container) as HTMLInputElement[];
        this._formOrder = ensureElement('.contact__form', this.container) as HTMLFormElement;

        this._formCloseButton.addEventListener('click', () => this.events.emit('closeFormContact'));
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