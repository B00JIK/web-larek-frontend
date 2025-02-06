import { ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components"; 
import { IEvents } from "../base/events"; 
 
interface ISuccess { 
    _modalCloseButton: HTMLButtonElement; 
    _modalTotalPrice: HTMLElement; 
    _modalFinishButton: HTMLButtonElement; 
    render(total: number): HTMLElement;  
} 
 
export class Success extends Component<ISuccess> { 
    protected _modalTotalPrice: HTMLElement; 
    protected _modalFinishButton: HTMLButtonElement; 
    protected container: HTMLElement 
 
    constructor(container: HTMLElement, protected events: IEvents) { 
        super(container);
        this.container = container;  
 
        this._modalTotalPrice = ensureElement('.order-success__description', this.container); 
        this._modalFinishButton = ensureElement('.order-success__close', this.container) as HTMLButtonElement; 
 
        this._modalFinishButton.addEventListener('click', () => this.events.emit('successModal: close')); 
    } 
 
    renderSuccess(total: number) { 
        this.setText(this._modalTotalPrice, String(total));
        return this.container; 
      } 
} 