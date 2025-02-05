import { IItemData, IOrderForm, IOrderResult } from "../../types"; 
import { Api, ApiListResponse } from "../base/api"; 
 
export class ApiService extends Api { 
    cdn: string; 
    items: IItemData[]; 
 
    constructor(cdn: string, baseUrl: string, options?: RequestInit) { 
        super(baseUrl, options); 
        this.cdn = cdn; 
    } 
 
    getItem(): Promise<IItemData[]> { 
        return this.get('/product').then((data: ApiListResponse<IItemData>) => 
            data.items.map((item) => ({ 
                ...item, 
                image: this.cdn + item.image, 
            })) 
        ); 
    } 
 
    postOrder(order: IOrderForm): Promise<IOrderResult> { 
        return this.post(`/order`, order).then((data: IOrderResult) => data); 
    } 
} 