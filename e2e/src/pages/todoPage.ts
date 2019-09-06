import { AngularSelector } from 'testcafe-angular-selectors';
import { Selector } from 'testcafe';

export class TodoPage {

  createTodoTitleInput: Selector;
  createTodoDescriptionInput: Selector;
  createTodoSaveButton: Selector;
  lastTodoElement: Selector;
  todoDialogWindow: Selector;

  constructor () {
    const createTodoComponent = AngularSelector('app-todo-page app-create-todo');
    const todoListComponent = AngularSelector('app-todo-list');

    this.createTodoTitleInput = createTodoComponent.find('#title');
    this.createTodoDescriptionInput = createTodoComponent.find('#description');
    this.createTodoSaveButton = createTodoComponent.find('button').withText('Save');
    this.lastTodoElement = todoListComponent.find('mat-card');
    this.todoDialogWindow = Selector('.mat-dialog-container');
  }

  findDialogTextByCssSelector(cssSelector: string, text: string) {
    return Selector(this.todoDialogWindow.find(cssSelector).withExactText(text));
  }
}

