import * as fromTodos from './todo.reducer';
import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';

export interface State {
  todos: fromTodos.State;
}

export const reducers: ActionReducerMap<State> = {
  todos: fromTodos.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Selectors
 */
export const selectTodoState = (state: State) => state.todos;

export const selectTodos = createSelector(
  selectTodoState,
  fromTodos.selectAll,
);

export const selectActiveTodoId = createSelector(
  selectTodoState,
  fromTodos.selectActiveTodoId,
);

export const selectActiveTodo = createSelector(
  selectTodoState,
  fromTodos.selectActiveTodo,
);
