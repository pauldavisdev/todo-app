import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ITodoItem } from 'src/app/todo';
import { TodoApiActions, TodoPageActions } from 'src/app/todo/actions';
import { createSelector } from '@ngrx/store';

const adapter = createEntityAdapter({
  selectId: (todo: ITodoItem) => todo.id
});

export interface State extends EntityState<ITodoItem> {
  activeTodoId: string | null;
}

export const initialState: State = adapter.getInitialState({
  activeTodoId: null
});

export function reducer(
  state: State = initialState,
  action: TodoApiActions.Union | TodoPageActions.Union
): State {
  switch (action.type) {
    case TodoPageActions.enter.type: {
      return { ...state, activeTodoId: null };
    }
    case TodoPageActions.selectTodo.type: {
      return { ...state, activeTodoId: action.todoId };
    }
    case TodoPageActions.clearSelectedTodo.type: {
      return { ...state, activeTodoId: null };
    }
    case TodoApiActions.loadTodosSuccess.type: {
      return adapter.addAll(action.todos, state);
    }
    default: {
      return state;
    }
  }
}

export const { selectEntities, selectAll } = adapter.getSelectors();

export const selectActiveTodoId = (state: State) => state.activeTodoId;

export const selectActiveTodo = createSelector(
  selectEntities,
  selectActiveTodoId,
  (entities, activeTodoId) => entities[activeTodoId],
);
