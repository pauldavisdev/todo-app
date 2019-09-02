import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { RouterModule } from '@angular/router';
import { TODO_ROUTES } from './todo.routes';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { MaterialModule } from '../material.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoApiEffects } from './todo-api.effects';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';

@NgModule({
  declarations: [
    TodoListComponent,
    CreateTodoComponent,
    TodoCardComponent,
    TodoPageComponent,
    TodoDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TODO_ROUTES),
    NgxPaginationModule,
    FormsModule,
    MaterialModule,
    EffectsModule.forFeature([TodoApiEffects]),
  ],
  providers: [
    TodoService,
    { provide: 'canDeactivateCreateTodo',
    useValue: checkDirtyState },
  ],
  entryComponents: [
    TodoDialogComponent,
  ]
})
export class TodoModule {}

export function checkDirtyState(component: CreateTodoComponent) {
  if (component.isDirty) {
    return window.confirm('you have not saved this todo, are you sure you want to cancel?');
  }
  return true;
}
