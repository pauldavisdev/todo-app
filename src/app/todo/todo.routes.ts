import { TodoListComponent } from './todo-list/todo-list.component';
import { Routes } from '@angular/router';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoDetailsResolver } from './todo-details/todo-details.resolver';

export const TODO_ROUTES: Routes = [
  { path: '', component: TodoListComponent },
  {
    path: 'new',
    component: CreateTodoComponent,
    canDeactivate: ['canDeactivateCreateTodo']
  },
  {
    path: ':id',
    component: TodoDetailsComponent,
    resolve: { todoItem: TodoDetailsResolver },
  }
];
