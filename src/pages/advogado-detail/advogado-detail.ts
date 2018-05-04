import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdvogadoDTO } from '../../models/advogado.dto';
import { AdvogadoService } from '../../services/domain/advogado.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-advogado-detail',
  templateUrl: 'advogado-detail.html',
})
export class AdvogadoDetailPage {

  item: AdvogadoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public advogadoService: AdvogadoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let advogado_id = this.navParams.get('advogado_id');
    this.advogadoService.findById(advogado_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.advogadoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(advogado: AdvogadoDTO) {
    this.cartService.addAdvogado(advogado);
    this.navCtrl.setRoot('CartPage');
  }
}
