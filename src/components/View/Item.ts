import { IItemData } from "../../types"; 
import { ensureElement } from "../../utils/utils"; 
import { Component } from "../base/Components"; 
import { IEvents } from "../base/events"; 
 
 
 
export class Item extends Component<IItemData> { 
    protected _itemElement: HTMLElement; 
    protected _itemCategory: HTMLElement; 
    protected _itemTitle: HTMLElement; 
    protected _itemImage: HTMLImageElement; 
    protected _itemPrice: HTMLElement; 
    protected _itemButton: HTMLButtonElement; 
    protected _itemId: string; 
    protected _colors = <Record<string, string>>{ 
        "дополнительное": "additional", 
        "софт-скил": "soft", 
        "кнопка": "button", 
        "хард-скил": "hard", 
        "другое": "other", 
      } 
 
    constructor (container: HTMLElement, protected events: IEvents) { 
        super(container); 
        this._itemCategory = ensureElement('.card__category', this.container); 
        this._itemTitle = ensureElement('.card__title', this.container); 
        this._itemImage = ensureElement('.card__image', this.container) as HTMLImageElement; 
        this._itemPrice = ensureElement('.card__price', this.container); 
         
        this.container.addEventListener('click', () => this.events.emit('modalImageItem: open', {id: this._itemId})); 
    } 
 
    set title(value: string) { 
        this.setText(this._itemTitle, value); 
    } 
 
    set category(value: string) { 
        this.setText(this._itemCategory, value); 
        this.toggleClass(this._itemCategory, `card__category_${this._colors[value]}`);
    } 
 
    set image(value: string) { 
        this.setImage(this._itemImage, value); 
    } 
 
    set price(value: number) { 
        if (value === null) { 
            this.setText(this._itemPrice, 'Бесценно'); 
        } else { 
            this.setText(this._itemPrice, String(value) + ' синапсов') 
        } 
    } 
 
    set id(value: string) { 
        this._itemId = value; 
    } 
}     