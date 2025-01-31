import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";
import { IEvents } from "../base/events";


interface IPage {
    itemList: HTMLElement[];
    totalItems: (value: number) => void;
}

export class Page extends Component<IPage> {

    protected itemContainer: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected totalItemsCount: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.itemContainer = ensureElement('.gallery', this.container);
        this.basketButton = ensureElement('.header__basket', this.container) as HTMLButtonElement;
        this.totalItemsCount = ensureElement('.header__basket-counter', this.container);
        
        this.basketButton.addEventListener('click', () => this.events.emit('openBasket'));
    }

    set itemList(items: HTMLElement[]) {
        this.itemContainer.replaceChildren(...items);
    }

    totalItems(value: number) {
        this.totalItemsCount.textContent = String(value);
    }
}