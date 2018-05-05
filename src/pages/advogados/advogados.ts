import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdvogadoDTO } from '../../models/advogado.dto';
import { API_CONFIG } from '../../config/api.config';
import { AdvogadoService } from '../../services/domain/advogado.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-advogados',
  templateUrl: 'advogados.html',
})
export class AdvogadosPage {

  items : AdvogadoDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public advogadoService: AdvogadoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.advogadoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.advogadoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }  

  showDetail(advogado_id : string) {
    this.navCtrl.push('AdvogadoDetailPage', {advogado_id: advogado_id});
  }


  topics: string[];
 
  generateTopics() {
    this.topics = [
      'Storage in Ionic 2',
      'Ionic 2 - calendar',
      'Creating a Android application using ionic framework.',
      'Identifying app resume event in ionic - android',
      'What is hybrid application and why.?',
      'Procedure to remove back button text',
      'How to reposition ionic tabs on top position.',
      'Override Hardware back button in cordova based application - Ionic',
      'Drupal 8: Enabling Facets for Restful web services',
      'Drupal 8: Get current user session',
      'Drupal 8: Programatically create Add another field - Example',  
    ];
  }
  getTopics(ev: any) {
    this.generateTopics();
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
      this.topics = this.topics.filter((topic) => {
        return (topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
