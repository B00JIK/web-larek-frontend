import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";


export interface IModal {
    open(): void;
    close(): void;
    render(): void;
}

export class Modal implements IModal {
    protected container: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
    protected pageWrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        this.container = container;
        this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
        this._content = ensureElement('.modal__content', this.container);
        this.pageWrapper = document.querySelector('.page__wrapper');

        this.container.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    };
    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    };

    set locked(value: boolean) {
        if (value) {
          this.pageWrapper.classList.add('page__wrapper_locked');
        } else {
          this.pageWrapper.classList.remove('page__wrapper_locked');
        }
    }

    render() {
        this._content;
        this.open();
        return this.container;
    };
}