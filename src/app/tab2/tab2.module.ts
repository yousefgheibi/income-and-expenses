import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { PersianDatePipe } from '../pipes/persian-date.pipe';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [Tab2Page, PersianDatePipe]
})
export class Tab2PageModule {}
