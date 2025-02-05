import { IItemData } from "../../types"; 
import { ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components"; 
import { IEvents } from "../base/events"; 
 
export class PopupItem extends Component<IItemData> { 
    protected _closeButton: HTMLButtonElement; 
    protected _modalContent: HTMLElement; 
    protected _modalImage: HTMLImageElement; 
    protected _modalTitle: HTMLElement; 
    protected _modalCategory: HTMLElement; 
    protected _modalPrice: HTMLElement; 
    protected _modalDescription: HTMLElement; 
    protected _basketButton: HTMLButtonElement; 
    protected _itemId: string; 
    protected _colors = <Record<string, string>>{ 
        "дополнительное": "additional", 
        "софт-скил": "soft", 
        "кнопка": "button", 
        "хард-скил": "hard", 
        "другое": "other", 
      } 
 
 
    constructor(container: HTMLElement, protected events: IEvents) { 
        super(container) 
        this._basketButton = ensureElement('.card__button', this.container) as HTMLButtonElement; 
        this._modalImage = ensureElement('.card__image', this.container) as HTMLImageElement; 
        this._modalTitle = ensureElement('.card__title', this.container); 
        this._modalCategory = ensureElement('.card__category', this.container); 
        this._modalPrice = ensureElement('.card__price', this.container); 
        this._modalDescription = ensureElement('.card__text', this.container); 
         
        this._basketButton.addEventListener('click', () => this.events.emit('itemToBasket: add', {id: this._itemId})); 
        this._basketButton.addEventListener('click', () => this.events.emit('modaImagelItem: close')); 
    } 
 
    set title(value: string) { 
        this.setText(this._modalTitle, value); 
    } 
 
    set category(value: string) { 
        this.setText(this._modalCategory, value); 
        this.toggleClass(this._modalCategory, `card__category_${this._colors[value]}`);
    } 
 
    set image(value: string) { 
        this.setImage(this._modalImage, value); 
    } 
 
    set price(value: number) { 
        if (value === null) { 
            this.setDisabled(this._basketButton, true); 
            this.setText(this._modalPrice, 'Бесценно'); 
        } else { 
            this.setText(this._modalPrice, String(value) + ' синапсов') 
        } 
    } 

    set buttonDisabled(value: boolean) { 
        this.setDisabled(this._basketButton, value); 
    }
 
    set id(value: string) { 
        this._itemId = value; 
    } 
 
    set description(value: string) { 
        this.setText(this._modalDescription, value); 
    } 
}