import { Routes } from '@angular/router';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';

export const TODO_ROUTES: Routes = [
  { path: '', component: TodoPageComponent },
  {
    path: 'new',
    component: CreateTodoComponent,
    canDeactivate: ['canDeactivateCreateTodo']
  },
];
