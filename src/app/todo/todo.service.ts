import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ITodoItem } from './todo-item.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<Array<ITodoItem>> {
    return this.http
      .get<Array<ITodoItem>>(API_URL + 'todo')
      .pipe(catchError(this.handleError<Array<ITodoItem>>('getTodoList', [])));
  }

  getTodoById(id: number): Observable<ITodoItem> {
    return this.http
      .get<ITodoItem>(API_URL + `todo/${id}`)
      .pipe(catchError(this.handleError<ITodoItem>('getTodoById')));
  }

  saveTodo(newTodo: ITodoItem): Observable<ITodoItem> {

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<ITodoItem>(API_URL + 'todo', newTodo, options)
      .pipe(catchError(this.handleError<ITodoItem>('createTodo')));
  }

  updateTodo(todoItem: ITodoItem) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<ITodoItem>(API_URL + `todo/${todoItem.id}`, todoItem, options)
      .pipe(catchError(this.handleError<ITodoItem>('updateTodo')));
  }

  deleteTodo(todoItem: ITodoItem) {
    return this.http
    .delete<ITodoItem>(API_URL + `todo/${todoItem.id}`)
    .pipe(catchError(this.handleError<ITodoItem>('updateTodo')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
