import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../todo.service';
import { ITodoItem } from '../../todo-item.model';
import * as fromRoot from 'src/app/shared/state';
import { Store } from '@ngrx/store';
import { TodoPageActions } from '../../actions';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  isDirty = true;

  title: string;
  description: string;

  constructor(
    private router: Router,
    private todoService: TodoService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {}

  saveTodo(formValues) {

    const newTodo: ITodoItem = {
      id: 0,
      title: formValues.title,
      description: formValues.description,
      userId: 1,
      completed: false
    };

    console.log(newTodo);

    this.store.dispatch(TodoPageActions.saveTodo({ todo: newTodo }));
  }
}
