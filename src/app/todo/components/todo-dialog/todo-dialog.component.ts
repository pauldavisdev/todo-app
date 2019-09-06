import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITodoItem } from '../../todo-item.model';
import * as fromRoot from 'src/app/shared/state';
import { Store } from '@ngrx/store';
import { TodoPageActions } from '../../actions';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent implements OnInit {

  title: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<fromRoot.State>,
    private todoService: TodoService,
  ) {
  }

  ngOnInit() {
    this.dialogRef.updateSize('800px', '400px');
  }

  updateTodo(formValues) {

    const todo: ITodoItem = {
      id: this.data.activeTodo.id,
      userId: this.data.activeTodo.userId,
      title: formValues.title,
      description: formValues.description,
      completed: this.data.activeTodo.completed,
    };

    console.log('todo-dialog todo model', todo);

    this.store.dispatch(TodoPageActions.updateTodo({ todo: todo }));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
