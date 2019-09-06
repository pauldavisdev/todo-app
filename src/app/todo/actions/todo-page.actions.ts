import { createAction, props } from '@ngrx/store';
import { ITodoItem } from '..';

export const enter = createAction('[Todo Page] Enter');

export const selectTodo = createAction(
  '[Todo Page] Select Todo',
  props<{ todoId: string }>(),
);

export const clearSelectedTodo = createAction(
  '[Todo Page] Clear Selected Todo',
);

export const saveTodo = createAction(
  '[Todo Page] Save Todo',
  props<{ todo: ITodoItem }>(),
);

export const openDialog = createAction(
  '[Todo Page] Open Dialog',
);

export const closeDialog = createAction(
  '[Todo Page] Close Dialog',
);

export const updateTodo = createAction(
  '[Todo Page] Update Todo',
  props<{ todo: ITodoItem }>(),
);

export type Union = ReturnType<
| typeof enter
| typeof selectTodo
| typeof clearSelectedTodo
| typeof saveTodo
| typeof openDialog
| typeof closeDialog
| typeof updateTodo
>;
