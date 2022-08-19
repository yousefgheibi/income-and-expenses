import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Budget } from '../models/budget.model';
import { BudgetService } from '../services/budget.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  val: number;
  description: string;
  items: Array<Budget> = [];
  thisMonthItems: Array<Budget> = [];
  sumIncome: number;
  sumExpenses: number;
  constructor(private storage: Storage, private budgetService: BudgetService) {
    storage.create();

  }

  ionViewDidEnter(){
    const name = this.storage.get('items').then((val)=>
    {
      this.items = val;
      this.calculateResult();
    });
  }

  calculateResult(){
    this.thisMonthItems = [];
    this.sumIncome = 0;
    this.sumExpenses = 0;
    const today = new Date().toLocaleDateString('fa-IR');
    const todayYear = today.split('/')[0];
    const todayMonth = today.split('/')[1];

    this.items.forEach((item)=>{
      const itemDate = new Date(item.date).toLocaleDateString('fa-IR');
      const itemYear = itemDate.split('/')[0];
      const itemMonth = itemDate.split('/')[1];

      if(itemYear === todayYear && itemMonth === todayMonth){
        this.thisMonthItems.push({
          id: item.id,
          val:item.val,
          date: item.date,
          description: item.description,
          type: item.type
        });
      }
    });

    this.thisMonthItems.filter((item => item.type === 'درآمد')).forEach((x)=>{
        this.sumIncome += x.val;
    });

    this.thisMonthItems.filter((item => item.type === 'هزینه')).forEach((x)=>{
      this.sumExpenses += x.val;
  });
  }


  remove(id: number){
    const index = this.items.findIndex(x=>x.id === id);
    this.items.splice(index,1);
    this.storage.set('items',this.items);
    this.ionViewDidEnter();
  }
}
