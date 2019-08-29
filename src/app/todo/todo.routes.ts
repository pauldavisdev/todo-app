import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Routes } from '@angular/router';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoDetailsResolver } from './components/todo-details/todo-details.resolver';
import { TodoPageComponent } from './components/todo-page/todo-page.component';

export const TODO_ROUTES: Routes = [
  { path: '', component: TodoPageComponent },
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
