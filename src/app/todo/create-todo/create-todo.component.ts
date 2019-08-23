import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { ITodoItem } from '../todo-item.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  isDirty = true;

  title: string;

  constructor(private router: Router,
    private todoService: TodoService) { }

  ngOnInit() {
  }

  saveTodo(formValues) {
    const newTodo: ITodoItem = {
      title: formValues.title,
      userId: 1,
      completed: false
    };

    this.todoService.saveTodo(newTodo).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/todos']);
    });
  }

}
