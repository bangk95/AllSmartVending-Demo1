import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public ItemQuantity: number = 1;
  public carItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProduct() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.carItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product: any) {
    this.carItemList.push(product);
    this.modifyQuantity();
    this.productList.next(this.carItemList);
    this.getTotalPrice();
    console.log(this.carItemList);
    
  }

  getTotalPrice(): number{
    let grandTotal = 0;
    this.carItemList.map((a:any)=>{
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.carItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.carItemList.splice(index,1);
      }
    });
    this.productList.next(this.carItemList);
  }

  removeAllCart() {
    this.carItemList = [];
    this.productList.next(this.carItemList);
  }

  modifyQuantity() {
    this.ItemQuantity = this.ItemQuantity
  }
}
