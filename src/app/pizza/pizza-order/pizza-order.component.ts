import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromPizza from '../pizza.reducer';
import * as actions from '../pizza.actions';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css'],
})
export class PizzaOrderComponent implements OnInit {

  pizzas: Observable<any>;

  constructor(private store: Store<fromPizza.State>) { }

  ngOnInit() {
    this.pizzas = this.store.select(fromPizza.selectAll);
    this.store.dispatch(new actions.Query());
  }

  createPizza() {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small',
    };

    this.store.dispatch(new actions.Create(pizza));
  }

  updatePizza(id, size) {
    this.store.dispatch(new actions.Update(id, {size: size}));
  }

  deletePizza(id) {
    this.store.dispatch(new actions.Delete(id));
  }

}
