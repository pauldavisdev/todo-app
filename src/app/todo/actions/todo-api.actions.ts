import { createAction, props } from '@ngrx/store';
import { ITodoItem } from '../todo-item.model';

export const loadTodosSuccess = createAction(
  '[Todo API] Load Todos Success',
  props<{ todos: ITodoItem[] }>()
);

export const loadTodosFailure = createAction('[Todo API] Load Todos Failure');

export type Union = ReturnType<
  typeof loadTodosSuccess | typeof loadTodosFailure
>;
