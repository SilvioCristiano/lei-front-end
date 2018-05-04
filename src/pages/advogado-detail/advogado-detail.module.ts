import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvogadoDetailPage } from './advogado-detail';

@NgModule({
  declarations: [
    AdvogadoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvogadoDetailPage),
  ],
})
export class AdvogadoDetailPageModule {}
