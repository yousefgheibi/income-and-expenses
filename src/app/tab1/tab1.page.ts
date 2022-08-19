import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Budget } from 'src/app/models/budget.model';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  val: number;
  description: string;
  items: Array<Budget> = [];
  thisMonthItems: Array<Budget> = [];
  sumIncome;
  sumExpenses;
  constructor(private budgetService: BudgetService,private storage: Storage) {
    this.val = 1000;
    storage.create();
  }

  ionViewDidEnter(){
    this.storage.get('items').then((val)=>{
      if(val){
        this.items = val;
        this.budgetService.calculateResult();
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
      date: Date.now(),
      description: this.description,
      type: ftype
    });
    this.storage.set('items', this.items);
    this.budgetService.calculateResult();
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
