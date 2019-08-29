import { createAction, props } from '@ngrx/store';

export const enter = createAction('[Todo Page] Enter');

export const selectTodo = createAction(
  '[Todo Page] Select Todo',
  props<{ todoId: string }>(),
);

export const clearSelectedTodo = createAction(
  '[Todo Page] Clear Selected Todo',
);

export const openDialog = createAction(
  '[Todo Page] Open Dialog',
);

export type Union = ReturnType<
| typeof enter
| typeof selectTodo
| typeof clearSelectedTodo
| typeof openDialog
>;
