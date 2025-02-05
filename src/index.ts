import './scss/styles.scss'; 
import { Item } from './components/View/Item'; 
import { ApiService } from './components/Model/ApiService'; 
import { API_URL, CDN_URL } from './utils/constants'; 
import { EventEmitter } from './components/base/events'; 
import { DataModel } from './components/Model/DataModel'; 
import { cloneTemplate, ensureElement} from './utils/utils'; 
import { Page } from './components/View/Page'; 
import { PopupItem } from './components/View/PopupItem'; 
import { BasketItem } from './components/View/BasketItem'; 
import { Basket } from './components/View/Basket'; 
import { BasketModel } from './components/Model/BasketModel'; 
import { PaymentForm } from './components/View/PaymentForm'; 
import { FormModel } from './components/Model/FormModel'; 
import { IOrderForm } from './types'; 
import { ContactForm } from './components/View/ContactForm'; 
import { Success } from './components/View/Success'; 
import { Modal } from './components/View/Modal'; 



const templateCard = document.querySelector('#card-catalog') as HTMLTemplateElement; 
const templateBasketItem = document.querySelector('#card-basket') as HTMLTemplateElement;  
const itemPopup = document.querySelector('#card-preview') as HTMLTemplateElement; 
const templateBasketPopup = document.querySelector('#basket') as HTMLTemplateElement; 
const formPaymentPopup = cloneTemplate('#order') as HTMLFormElement; 
const formContactPopup = cloneTemplate('#contacts') as HTMLFormElement;
const successPopup = cloneTemplate('#success');
 
const events = new EventEmitter(); 
const apiService = new ApiService(CDN_URL, API_URL); 
const formModel = new FormModel(events); 
const dataModel = new DataModel(events); 
const popupItem = new PopupItem(cloneTemplate(itemPopup), events); 
const page = new Page(document.querySelector('.page__wrapper') as HTMLElement, events); 
const basket = new Basket(cloneTemplate(templateBasketPopup), events); 
const basketModel = new BasketModel(events); 
const paymentForm = new PaymentForm(formPaymentPopup, events); 
const contactForm = new ContactForm(formContactPopup , events); 
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events); 


// получение данных с сервера 
 
apiService.getItem() 
    .then(data =>  { 
        dataModel.setItems(data); 
        console.log(dataModel); 
    }) 
    .catch(error => console.log(error));  
 
// вывод карточек 
  
events.on('_items:changed', () => { 
    const itemsArray = dataModel.getItems().map(item => new Item(cloneTemplate(templateCard), events).render(item)) 
    page.render({itemList: itemsArray}); 
})  
 
// открытие модального окна с описанием карточки 
 
events.on('modalImageItem: open', ({id}:{id: string}) => { 
    const item = dataModel.getItems().find(item => item.id === id); 
    const itemId = basketModel.itemsIdList();
        if(itemId.includes(item.id)) {
            popupItem.buttonDisabled = true;
        } else {
            popupItem.buttonDisabled = false;
        }

    modal.content = popupItem.render(item); 
    modal.render(); 
}); 
 
// закрытие модального окна 
 
events.on('modaImagelItem: close', () => { 
    modal.close(); 
}); 
 
// добавить в корзину 
 
events.on('itemToBasket: add', ({id}:{id: string}) => { 
    const item = dataModel.getItems().find(item => item.id === id); 
    basketModel.addItem(item); 
    page.totalItems(basketModel.itemsCounter()); 
}); 
 
// удалить из корзины 
 
events.on('itemToBasket: delete', ({id}:{id: string}) => { 
    const item = dataModel.getItems().find(item => item.id === id); 
    let i = 0; 
    basketModel.deleteItem(item); 
    page.totalItems(basketModel.itemsCounter()); 
    basket.totalItems(basketModel.totalItemsPrice()); 
    basket.itemList = basketModel.basketItemsList.map(function(item) { 
        const basketItem = new BasketItem(cloneTemplate(templateBasketItem), events);      
        i = i + 1; 
        return basketItem.renderItem(item, i); 
    }); 
}); 
 
// открыть корзину 
 
events.on('openBasket', () => { 
    basket.totalItems(basketModel.totalItemsPrice()); 
    let i = 0; 
    basket.itemList = basketModel.basketItemsList.map(function(item) { 
        const basketItem = new BasketItem(cloneTemplate(templateBasketItem), events);      
        i = i + 1; 
        return basketItem.renderItem(item, i); 
            }); 
    modal.content = basket.renderBasket(); 
    modal.render(); 
}); 
 
// открыть форму оплаты 
 
events.on('orderItem', () => { 
    modal.content = paymentForm.render(); 
    modal.render(); 
    formModel.items = basketModel.basketItemsList.map(item => item.id); 
    formModel.total = basketModel.totalItemsPrice(); 
}); 
 
// ввод адреса 
events.on('order:changeAddress', ({field, value}:{field: string, value: string})  => { 
    formModel.setOrderAddress(field, value); 
}); 
 
// выбрать способ оплаты 
 
events.on('paymentForm: choosePaymentMethod', (button: HTMLButtonElement) => { 
    paymentForm.choosePaymentMethod = button.name; 
    formModel.payment = button.name; 
}); 
 
// валидация ввода адресса и выбора типа оплаты 
 
events.on('formErrors:change', (errors: Partial<IOrderForm>) => { 
    const { address, payment } = errors; 
    paymentForm.valid = !address && !payment; 
    paymentForm.errors = Object.values({address, payment}).filter(i => !!i).join('; '); 
}); 
 
// открытие формы контактов 
 
events.on('paymentForm: submit', () => { 
    modal.content = contactForm.render(); 
    modal.render(); 
}) 
 
// ввод контактов 
 
events.on('contact:changeContacts', ({field, value}:{field: string, value: string})  => { 
    formModel.setOrderContacts(field, value); 
}); 
 
// валидация инпутов телефона и почты 
 
events.on('formErrors:change', (errors: Partial<IOrderForm>) => { 
    const { email, phone } = errors; 
    contactForm.valid = !email && !phone; 
    contactForm.errors = Object.values({email, phone}).filter(i => !!i).join('; '); 
}); 
 
events.on('сontactForm: submit', () => { 
    apiService.postOrder(formModel.getOrder()) 
        .then((data) => { 
            console.log(data); 
            const success = new Success(successPopup, events); 
            modal.content = success.render(formModel.total); 
            modal.render(); 
            basketModel.clearBasket(); 
            page.totalItems(basketModel.itemsCounter()); 
        }) 
        .catch(error => console.log(error)); 
}); 
 
events.on('successModal: close', () => { 
    modal.close(); 
}); 
 
events.on('modal:open', () => { 
    modal.locked = true; 
}); 
 
events.on('modal:close', () => { 
    modal.locked = false; 
});