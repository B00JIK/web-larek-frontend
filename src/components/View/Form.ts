import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;
    protected _formOrder: HTMLFormElement;

    constructor(container: HTMLFormElement) {
        super(container);

        this._formOrder = container;
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this._submit = ensureElement('.order__button', this.container) as HTMLButtonElement;

    }

    set valid(value: boolean) {
        this.setDisabled(this._submit, !value);
    }   

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render() {
        return this._formOrder;
    }
}