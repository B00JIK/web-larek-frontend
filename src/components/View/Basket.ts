import { IItemData } from "../../types";
import { createElement, ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { IEvents } from "../base/events";

interface IBasket {
    itemList: HTMLElement[];
    totalItems: (value: number) => void;
}

export class Basket extends Component<IBasket> {
    protected _list: HTMLElement;
    // protected _basketCloseButton: HTMLButtonElement;
    protected _busketOrderButton: HTMLButtonElement;
    protected _basketFullPrice: HTMLElement;
    protected _busketItemsList: HTMLElement[];
    protected items: IItemData[];

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._busketOrderButton = ensureElement('.basket__button', this.container) as HTMLButtonElement;
        this._basketFullPrice = ensureElement('.basket__price', this.container);

        this._busketOrderButton.addEventListener('click', () => this.events.emit('orderItem'));
    
        this.items = [];
    }

    totalItems(value: number) {
        this._basketFullPrice.textContent = String(value);
    }

    set itemList(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this._busketOrderButton.removeAttribute('disabled');
        } else {
            this._busketOrderButton.setAttribute('disabled', 'disabled');
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
        }
    }
}