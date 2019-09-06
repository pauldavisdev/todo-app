import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../todo.service';
import { ITodoItem } from '../../todo-item.model';
import * as fromRoot from 'src/app/shared/state';
import { Store, select } from '@ngrx/store';
import { TodoPageActions } from '../../actions';
import { pipe } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  isDirty = true;

  title: string;
  description: string;
  nextId$ = this.store.pipe(select(fromRoot.selectNextId));

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {}

  saveTodo(formValues) {

    const newTodo: ITodoItem = {
      title: formValues.title,
      description: formValues.description,
      userId: 1,
      completed: false
    };

    console.log(newTodo);

    this.store.dispatch(TodoPageActions.saveTodo({ todo: newTodo }));
  }

  cancel() {
    this.title = '';
    this.description = '';

  }
}
