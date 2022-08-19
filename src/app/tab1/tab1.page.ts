import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
interface Budget {
  val: number;
  date: string;
  description: string;
  type: string;
};
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  val: number;
  description: string;
  items: Array<Budget> = [];
  constructor(private storage: Storage) {
    this.val = 1000;
    storage.create();
  }

  ionViewDidEnter(){
    this.storage.get('items').then((val)=>{
      if(val){
        this.items = val;
      }
    });
  }

  register(type: string){
    let ftype: string;
    if(type === 'income'){
      ftype = 'درآمد';
    } else{
      ftype = 'هزینه';
    }
    this.items.push({
      val:this.val,
      date:new Date().toLocaleDateString('fa-IR'),
      description: this.description,
      type: ftype
    });
    this.storage.set('items', this.items);
  }

  checkValue(type: string){
    if(type === 'mins'){
      this.val = this.val - 1000;
    }
    else if(type === 'plus'){
      this.val = this.val + 1000;
    }
  }
}
