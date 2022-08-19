import { Injectable } from '@angular/core';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  val: number;
  description: string;
  items: Array<Budget> = [];
  thisMonthItems: Array<Budget> = [];
  sumIncome: number;
  sumExpenses: number;

  constructor() { }

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
}
