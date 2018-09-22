import { Action } from '@ngrx/store';
import { Pizza } from './pizza.reducer';

export const CREATE = '[Pizzas] Create';
export const UPDATE = '[Pizzas] Update';
export const DELETE = '[Pizzas] Delete';
export const QUERY = '[Pizzas] Query';
export const ADD_ALL = '[Pizzas] AddAll';
export const SUCCESS = '[Pizzas] Success';

export class Create implements Action {
  readonly type = CREATE;

  constructor(public pizza: Pizza) {}
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public id: string, public changes: Partial<Pizza>) {}
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public id: string) {}
}

export class Query implements Action {
  readonly type = QUERY;

  constructor() {}
}

export class AddAll implements Action {
  readonly type = ADD_ALL;

  constructor(public pizzas: Pizza[]) {}
}

export class Success implements Action {
  readonly type = SUCCESS;

  constructor() {}
}

export type PizzaActions
  = Create
  | Update
  | Delete
  | Query
  | AddAll
  | Success;
