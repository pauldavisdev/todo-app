import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { TodoListComponent } from './todo-list/todo-list.component';
import { RouterModule } from '@angular/router';
import { TODO_ROUTES } from './todo.routes';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoDetailsResolver } from './todo-details/todo-details.resolver';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoFilterComponent,
    TodoCardComponent,
    TodoDetailsComponent,
    NavbarComponent,
    CreateTodoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TODO_ROUTES),
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    TodoService,
    { provide: 'canDeactivateCreateTodo',
    useValue: checkDirtyState },
    TodoDetailsResolver
  ]
})
export class TodoModule {}

export function checkDirtyState(component: CreateTodoComponent) {
  if (component.isDirty) {
    return window.confirm('you have not saved this todo, are you sure you want to cancel?');
  }
  return true;
}
