import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { TodoPageActions, TodoApiActions } from './actions';
import { TodoService } from './todo.service';
import {
  exhaustMap,
  catchError,
  map,
  tap,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/state';

@Injectable()
export class TodoApiEffects {
  activeTodo$ = this.store.pipe(select(fromRoot.selectActiveTodo));
  constructor(
    private actions$: Actions<TodoPageActions.Union>,
    private todoService: TodoService,
    private store: Store<fromRoot.State>
  ) {}

  @Effect() enterTodoPage$ = this.actions$.pipe(
    ofType(TodoPageActions.enter.type),
    exhaustMap(() =>
      this.todoService.getTodoList().pipe(
        map(todos => TodoApiActions.loadTodosSuccess({ todos })),
        tap(todos => console.log(todos)),
        catchError(() => of(TodoApiActions.loadTodosFailure()))
      )
    )
  );
}
