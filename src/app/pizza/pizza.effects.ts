import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

import * as actions from './pizza.actions';
import * as fromPizza from './pizza.reducer';

@Injectable()
export class PizzaEffects {

  @Effect()
  query$: Observable<Action> = this.actions$.ofType(actions.QUERY)
    .pipe(
      switchMap(action => {
        const ref = this.afs.collection<fromPizza.Pizza>('pizzas');
        return ref.snapshotChanges().map(arr => {
          return arr.map(doc => {
            const data = doc.payload.doc.data();
            return {id: doc.payload.doc.id, ...data} as fromPizza.Pizza;
          });
        });
      }),
      map(arr => {
        console.log(arr);
        return new actions.AddAll(arr);
      }),
    );

  @Effect()
  create$: Observable<Action> = this.actions$.ofType(actions.CREATE)
    .pipe(
      map((action: actions.Create) => action.pizza),
      switchMap(pizza => {
        const ref = this.afs.doc<fromPizza.Pizza>(`pizzas/${pizza.id}`);
        return from(ref.set(pizza));
      }),
      map(() => {
        return new actions.Success();
      }),
    );

  @Effect()
  update$: Observable<Action> = this.actions$.ofType(actions.UPDATE)
    .pipe(
      map((action: actions.Update) => action),
      switchMap(data => {
        const ref = this.afs.doc<fromPizza.Pizza>(`pizzas/${data.id}`);
        return from(ref.update(data.changes));
      }),
      map(() => {
        return new actions.Success();
      }),
    );

  @Effect()
  delete$: Observable<Action> = this.actions$.ofType(actions.DELETE)
    .pipe(
      map((action: actions.Delete) => action.id),
      switchMap(id => {
        const ref = this.afs.doc<fromPizza.Pizza>(`pizzas/${id}`);
        return from(ref.delete());
      }),
      map(() => {
        return new actions.Success();
      }),
    );

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
  ) {}
}
