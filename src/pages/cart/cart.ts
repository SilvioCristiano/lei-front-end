import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { AdvogadoService } from '../../services/domain/advogado.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { AdvogadoDTO } from '../../models/advogado.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public advogadoService: AdvogadoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.advogadoService.getSmallImageFromBucket(item.advogado.id)
        .subscribe(response => {
          item.advogado.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.advogado.id}-small.jpg`;
        },
        error => {});
    }
  }  

  removeItem(advogado: AdvogadoDTO) {
    this.items = this.cartService.removeAdvogado(advogado).items;
  }

  increaseQuantity(advogado: AdvogadoDTO) {
    this.items = this.cartService.increaseQuantity(advogado).items;
  }

  decreaseQuantity(advogado: AdvogadoDTO) {
    this.items = this.cartService.decreaseQuantity(advogado).items;
  }

  total() : number {
    return this.cartService.total();
  }  

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('PickAddressPage');
  }
}
