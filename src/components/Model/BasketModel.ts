import { IItemData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";


interface IBasketModel {
    BasketItemsList: IItemData[];
    itemsCounter(): number;
    totalItemsPrice(): number;
    addItem(item: IItemData): void;
    deleteItem(item: IItemData): void;
}

export class BasketModel implements IBasketModel {
    protected _basketItemsList: IItemData[];
    protected _basketOrderButton: HTMLButtonElement;

    constructor(protected events: IEvents) {
        this._basketItemsList = [];
    }

    set BasketItemsList(value: IItemData[]) {
        this._basketItemsList = value;
    }       

    get BasketItemsList(): IItemData[] {
        return this._basketItemsList;
    }       

    itemsCounter() {
        return this._basketItemsList.length;
    }

    totalItemsPrice() {
        let sumAll = 0;
        this._basketItemsList.forEach(item => {sumAll += item.price});
        return sumAll;
    }

    addItem(item: IItemData) {
        this._basketItemsList.push(item);
        this.events.emit('itemsbasket:changed');
    }

    deleteItem(item: IItemData) {
        const index = this._basketItemsList.indexOf(item);
        this._basketItemsList.splice(index, 1);
        this.events.emit('itemsbasket:changed');
    }

    clearBasket() {
        this._basketItemsList = [];
        this.events.emit('itemsbasket:changed');
    }
}