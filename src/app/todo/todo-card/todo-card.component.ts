import { Component, OnInit, Input } from '@angular/core';
import { ITodoItem } from '../todo-item.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {

  @Input() todoItem: ITodoItem;

  constructor() { }

  ngOnInit() {
  }

}
