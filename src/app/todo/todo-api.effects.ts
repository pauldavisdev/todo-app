import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { TodoPageActions, TodoApiActions } from './actions';
import { TodoService } from './todo.service';
import {
  exhaustMap,
  catchError,
  map,
  tap,
  mergeMap,
  concatMap
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

  @Effect() saveTodo$ = this.actions$.pipe(
    ofType(TodoPageActions.saveTodo.type),
    mergeMap(action =>
      this.todoService.saveTodo(action.todo).pipe(
        map(todo => TodoApiActions.saveTodoSuccess({ todo })),
        catchError(() => of(TodoApiActions.saveTodoFailure()))
      )
    )
  );

  @Effect() updateTodo$ = this.actions$.pipe(
    ofType(TodoPageActions.updateTodo.type),
    mergeMap(action =>
      this.todoService.updateTodo(action.todo).pipe(
        map(todo => TodoApiActions.updateTodoSuccess({ todo })),
        catchError(() => of(TodoApiActions.updateTodoFailure())
        )
      )
    )
  );

  @Effect() deleteTodo$ = this.actions$.pipe(
    ofType(TodoPageActions.deleteTodo.type),
    mergeMap(action =>
      this.todoService.deleteTodo(action.todo).pipe(
        map(() =>
          TodoApiActions.deleteTodoSuccess({ todo: action.todo })
        ),
        catchError(() =>
          of(TodoApiActions.deleteTodoFailure({ todo: action.todo }))
        )
      )
    )
  );
}
