import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersistenciaPageRoutingModule } from './persistencia-routing.module';

import { PersistenciaPage } from './persistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersistenciaPageRoutingModule
  ],
  declarations: [PersistenciaPage]
})
export class PersistenciaPageModule {}
