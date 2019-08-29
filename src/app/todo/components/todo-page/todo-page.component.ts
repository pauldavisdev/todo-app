import { Component, OnInit } from '@angular/core';
import * as fromRoot from 'src/app/shared/state';
import { Store, select } from '@ngrx/store';
import { TodoPageActions } from '../../actions';
import { ITodoItem } from '../../todo-item.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  todos$ = this.store.pipe(select(fromRoot.selectTodos));
  activeTodo$ = this.store.pipe(select(fromRoot.selectActiveTodo));

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(TodoPageActions.enter());
  }

  onSelect(todo: ITodoItem) {
    this.store.dispatch(TodoPageActions.selectTodo({ todoId: todo.id.toString() }));
  }

}
