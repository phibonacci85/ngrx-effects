import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as actions from './pizza.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface Pizza {
  id: string;
  size: string;
}

export const pizzaAdapter = createEntityAdapter<Pizza>();

export interface State extends EntityState<Pizza> {}

export const initialState: State = pizzaAdapter.getInitialState();

export function pizzaReducer(
  state: State = initialState,
  action: actions.PizzaActions,
) {
  switch (action.type) {
    case actions.ADD_ALL:
      return pizzaAdapter.addAll(action.pizzas, state);
    default:
      return state;
  }
}

export const getPizzaState = createFeatureSelector<State>('pizza');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = pizzaAdapter.getSelectors(getPizzaState);
