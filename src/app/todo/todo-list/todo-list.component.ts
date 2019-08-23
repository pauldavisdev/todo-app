import { Component, OnInit, Input } from '@angular/core';
import { ITodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: ITodoItem[] = [];
  visibleTodoList: ITodoItem[];
  sortAsc = false;
  p = 1;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe((data: ITodoItem[]) => {
      this.todoList = data;
      this.visibleTodoList = [...this.todoList];
    });
  }

  filterSelected(event: string) {
    switch (event) {
      case 'all':
        this.showAll();
        break;
      case 'complete':
        this.showComplete();
        break;
      case 'incomplete':
        this.showIncomplete();
        break;
      default:
        console.log('error in switch');
        break;
    }
  }

  showAll() {
    this.visibleTodoList = [...this.todoList];
  }

  showComplete() {
    const completeTodoList = this.todoList.filter(t => t.completed === true);
    this.visibleTodoList = completeTodoList;
  }

  showIncomplete() {
    const incompleteTodoList = this.todoList.filter(t => t.completed === false);
    this.visibleTodoList = incompleteTodoList;
  }

  sortByTitle() {
    if (this.sortAsc) {
      this.visibleTodoList.sort(sortByTitleAsc).reverse();
    } else {
      this.visibleTodoList.sort(sortByTitleAsc);
    }
    this.sortAsc = !this.sortAsc;
  }
}

function sortByTitleAsc(t1: ITodoItem, t2: ITodoItem) {

  if (t1.title.toLocaleLowerCase() > t2.title.toLocaleLowerCase()) {
    return 1;
  } else if (t1.title === t2.title) {
    return 0;
  } else {
    return -1;
  }
}
