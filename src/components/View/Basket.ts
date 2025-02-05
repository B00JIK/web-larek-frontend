import { IItemData } from "../../types"; 
import { createElement, ensureAllElements, ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components"; 
import { IEvents } from "../base/events"; 
 
interface IBasket { 
    itemList: HTMLElement[]; 
    totalItems: (value: number) => void; 
    renderBasket(): HTMLElement; 
} 
 
export class Basket extends Component<IBasket> { 
    protected basket: HTMLElement; 
    protected _list: HTMLElement; 
    protected _busketOrderButton: HTMLButtonElement; 
    protected _basketFullPrice: HTMLElement; 
    protected _busketItemsList: HTMLElement[]; 
    protected items: HTMLElement[]; 
 
    constructor(container: HTMLElement, protected events: IEvents) { 
        super(container);

        this.basket = container; 
 
        this._list = ensureElement<HTMLElement>('.basket__list', this.basket); 
        this._busketOrderButton = ensureElement('.basket__button', this.basket) as HTMLButtonElement; 
        this._basketFullPrice = ensureElement('.basket__price', this.basket); 
         
 
        this._busketOrderButton.addEventListener('click', () => this.events.emit('orderItem')); 
     
        this.items = []; 
    } 
 
    totalItems(value: number) { 
        this.setText(this._basketFullPrice, `${String(value)}` + ` синапсов`);
    } 
 
    set itemList(items: HTMLElement[]) { 
        if (items.length) { 
            this._list.replaceChildren(...items); 
            this.setDisabled(this._busketOrderButton, false);
        } else { 
            this.setDisabled(this._busketOrderButton, true); 
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })); 
        } 
    } 
 
    renderBasket(): HTMLElement { 
        return this.basket; 
    } 
} 