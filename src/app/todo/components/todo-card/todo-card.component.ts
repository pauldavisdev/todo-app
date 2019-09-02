import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { ITodoItem } from '../../todo-item.model';
import { FormGroup, FormControl } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
@Injectable()
export class TodoCardComponent implements OnInit {

  constructor() {}

  originalTodo: ITodoItem | undefined;

  todoForm = new FormGroup({
    id: new FormControl(0),
    userId: new FormControl(0),
    title: new FormControl(''),
    description: new FormControl(''),
    completed: new FormControl(false)
  });

  @Input() set todo(todo: ITodoItem) {
    this.todoForm.reset();
    this.originalTodo = null;

    if (todo) {
      this.todoForm.setValue({
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        description: todo.description,
        completed: todo.completed
      });

      this.originalTodo = todo;
    }
  }

  ngOnInit() {}

}
