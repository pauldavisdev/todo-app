import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ITodoItem } from 'src/app/todo';
import { TodoApiActions, TodoPageActions } from 'src/app/todo/actions';
import { createSelector } from '@ngrx/store';

const adapter = createEntityAdapter<ITodoItem>();

export interface State extends EntityState<ITodoItem> {
  activeTodoId: string | number | null;
  isDialogOpen: boolean;
}

export const initialState: State = adapter.getInitialState({
  activeTodoId: null,
  isDialogOpen: false
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
    case TodoPageActions.openDialog.type: {
      console.log('dialog opened');
      return { ...state, isDialogOpen: true };
    }
    case TodoPageActions.closeDialog.type: {
      console.log('dialog closed');
      return { ...state, isDialogOpen: false };
    }
    case TodoApiActions.loadTodosSuccess.type: {
      return adapter.addAll(action.todos, state);
    }
    case TodoApiActions.saveTodoSuccess.type: {
      return adapter.addOne(action.todo, state);
    }
    case TodoApiActions.updateTodoSuccess.type: {
      console.log(action.todo);
      return adapter.updateOne(
        { id: action.todo.id, changes: action.todo },
        { ...state, activeTodoId: action.todo.id }
      );
    }
    case TodoApiActions.deleteTodoSuccess.type: {
      return adapter.removeOne(action.todo.id, {
        ...state,
        activeTodoId: null,
      });
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
  (entities, activeTodoId) => entities[activeTodoId]
);

export const selectIsDialogOpen = (state: State) => state.isDialogOpen;

export const selectNextId = createSelector(
  selectAll,
  (allTodos: ITodoItem[]) => {
    const ids = allTodos.map((todo) => todo.id);
    const nextId = Math.max(...ids) + 1;
    return nextId;
  }
);
