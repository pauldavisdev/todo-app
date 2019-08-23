import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {

  @Output() sortEmitter: EventEmitter<string> = new EventEmitter();
  @Output() filterOnChangeEmitter: EventEmitter<string> = new EventEmitter();

  sortByTitleAsc = true;

  constructor() {}

  ngOnInit() {}

  sortClicked() {
    this.sortEmitter.emit();
    this.sortByTitleAsc = !this.sortByTitleAsc;
  }

  filterChanged(event: string) {
    this.filterOnChangeEmitter.emit(event.toLocaleLowerCase());
  }
}
