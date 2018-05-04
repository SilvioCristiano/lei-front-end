import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvogadosPage } from './advogados';

@NgModule({
  declarations: [
    AdvogadosPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvogadosPage),
  ],
})
export class AdvogadosPageModule {}
