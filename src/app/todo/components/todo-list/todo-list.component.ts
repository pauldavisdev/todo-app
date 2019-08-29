import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITodoItem } from '../../todo-item.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos: ITodoItem[];
  @Output() select = new EventEmitter();
  ngOnInit(): void {
  }
}
