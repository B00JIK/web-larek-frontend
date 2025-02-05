import { ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components";
import { IEvents } from "../base/events"; 
 
 
export interface IModal { 
    open(): void; 
    close(): void; 
    render(): void; 
} 
 
export class Modal extends Component<IModal> { 
    protected container: HTMLElement; 
    protected closeButton: HTMLButtonElement; 
    protected _content: HTMLElement; 
    protected pageWrapper: HTMLElement; 
 
    constructor(container: HTMLElement, protected events: IEvents) { 
        super(container);
        
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
        this.toggleClass(this.container, 'modal_active', true);
        this.events.emit('modal:open'); 
    }; 

    close() { 
        this.toggleClass(this.container, 'modal_active', false); 
        this.content = null; 
        this.events.emit('modal:close'); 
    }; 
 
    set locked(value: boolean) { 
        if (value) { 
          this.toggleClass(this.pageWrapper, 'page__wrapper_locked', true);
        } else { 
          this.toggleClass(this.pageWrapper, 'page__wrapper_locked', false);
        } 
    } 
 
    render() { 
        this.open(); 
        return this.container; 
    }
}
    