import { Component, OnInit } from '@angular/core';
import { ITodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  todoItem: ITodoItem;

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.todoItem = this.route.snapshot.data['todoItem'];

    // this.todoService.getTodoById(+this.route.snapshot.params['id'])
    // .subscribe((todoData: ITodoItem) => {
    //   this.todoItem = todoData;
    // });
  }

  updateTodo(formValues) {
    const updatedTodo: ITodoItem = {
      id: this.todoItem.id,
      userId: this.todoItem.userId,
      title: formValues.title,
      completed: this.todoItem.completed,
    };

    console.log(updatedTodo);

    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.router.navigate(['/todo']);
    });
  }

  deleteTodo(todoItem: ITodoItem) {
    this.todoService.deleteTodo(todoItem).subscribe(() => {
      this.router.navigate(['todo']);
    });
  }

  completeTodo(formValues) {
    const updatedTodo: ITodoItem = {
      id: this.todoItem.id,
      userId: this.todoItem.userId,
      title: formValues.title,
      completed: true,
    };

    console.log(updatedTodo);

    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.router.navigate(['/todo']);
    });
  }

}
