import { createAction, props } from '@ngrx/store';
import { ITodoItem } from '../todo-item.model';

export const loadTodosSuccess = createAction(
  '[Todo API] Load Todos Success',
  props<{ todos: ITodoItem[] }>()
);

export const loadTodosFailure = createAction('[Todo API] Load Todos Failure');

export const saveTodoSuccess = createAction(
  '[Todo API] Save Todo Success',
  props<{ todo: ITodoItem }>()
);

export const saveTodoFailure = createAction('[Todo API] Save Todo Failure');

export const updateTodoSuccess = createAction(
  '[Todo API] Update Todo Success',
  props<{ todo: ITodoItem }>()
);

export const updateTodoFailure = createAction('[Todo API] Update Todo Failure');

export type Union = ReturnType<
  | typeof loadTodosSuccess
  | typeof loadTodosFailure
  | typeof saveTodoSuccess
  | typeof saveTodoFailure
  | typeof updateTodoSuccess
  | typeof updateTodoFailure
>;
