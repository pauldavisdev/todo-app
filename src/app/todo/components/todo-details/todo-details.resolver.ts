import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TodoService } from '../../todo.service';
import { Observable } from 'rxjs';
import { ITodoItem } from '../../todo-item.model';

@Injectable()
export class TodoDetailsResolver implements Resolve<any> {

  constructor (private todoService: TodoService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.todoService.getTodoById(+route.paramMap.get('id'));
  }

}
