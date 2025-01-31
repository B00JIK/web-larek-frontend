import { IDataModel, IItemData } from "../../types";
import { IEvents } from "../base/events";


export class DataModel {
    protected items: IItemData[] = [];
    protected openedItem: IItemData;
    

    constructor(protected events: IEvents) {
        this.items = []
    }

    setItems(data: IItemData[]) {
        this.items = data;
        this.events.emit('_items:changed');
    }

    getItems(): IItemData[] {
        return this.items;
    }
}