import { Component, OnInit } from '@angular/core';
import * as fromRoot from 'src/app/shared/state';
import { Store, select } from '@ngrx/store';
import { TodoPageActions } from '../../actions';
import { ITodoItem } from '../../todo-item.model';
import { MatDialog } from '@angular/material';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  todos$ = this.store.pipe(select(fromRoot.selectTodos));
  activeTodo$ = this.store.pipe(select(fromRoot.selectActiveTodo));

  constructor(private store: Store<fromRoot.State>,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(TodoPageActions.enter());
  }

  onSelect(todo: ITodoItem) {
    this.store.dispatch(TodoPageActions.selectTodo({ todoId: todo.id.toString() }));
    this.openDialog(todo);
  }

  openDialog(todo: ITodoItem): void {
    if (todo) {
      const dialogRef = this.dialog.open(TodoDialogComponent, {
        data: {
          activeTodo: todo
        }
      });
      this.store.dispatch(TodoPageActions.openDialog());

      dialogRef.afterClosed().subscribe(() => {
        this.store.dispatch(TodoPageActions.closeDialog());
      });
    }
  }

}
