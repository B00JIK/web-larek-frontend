import { IItemData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { IEvents } from "../base/events";

export class BasketItem extends Component<IItemData> {
    protected _cardTitle: HTMLElement;
    protected _cardPrice: HTMLElement;
    protected _itemIndex: HTMLElement;
    protected _basketPrice: HTMLElement;
    protected _itemDeleteButton: HTMLButtonElement;
    protected _basketSubmitButton: HTMLButtonElement;
    protected _basketCloseButton: HTMLButtonElement;
    protected _itemId: string;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._cardTitle = ensureElement('.card__title', this.container);
        this._cardPrice = ensureElement('.card__price', this.container);
        this._itemIndex = ensureElement('.basket__item-index', this.container);
        this._itemDeleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;

        this._itemDeleteButton.addEventListener('click', () => this.events.emit('itemToBasket: delete', {id: this._itemId}));
    }

    set title(value: string) {
        this.setText(this._cardTitle, value);
    }

    set price(value: number) {
        if (value === null) {
            this.setText(this._cardPrice, 'Бесценно');
        } else {
            this.setText(this._cardPrice, String(value) + ' синапсов')
        }
    }   

    set id(value: string) {
        this._itemId = value;
    }

    get id(): string {
        return this._itemId;
    }
}