export interface IItemData {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number | null;
    description: string;
}

export interface IDataModel {
    items: IItemData[];
}

export interface IOrderForm {
    email?: string;
    phone?: string;
    address?: string;
    payment?: string;
    total?: number;
}

export interface IOrder extends IOrderForm {
    items: string[]
}

export interface IOrderResult {
    id: string[];
    total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;


