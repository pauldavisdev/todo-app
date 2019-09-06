import { AngularSelector } from 'testcafe-angular-selectors';
import { Selector } from 'testcafe';

export class TodoPage {

  createTodoTitleInput: Selector;
  createTodoDescriptionInput: Selector;
  createTodoSaveButton: Selector;
  todoCards: Selector;
  todoDialogWindow: Selector;
  todoDialogTitle: Selector;
  todoDialogDescription: Selector;
  updateTodoButton: Selector;

  constructor () {
    const createTodoComponent = AngularSelector('app-todo-page app-create-todo');
    const todoListComponent = AngularSelector('app-todo-list');

    this.createTodoTitleInput = createTodoComponent.find('#title');
    this.createTodoDescriptionInput = createTodoComponent.find('#description');
    this.createTodoSaveButton = createTodoComponent.find('button').withText('Save');
    this.todoCards = todoListComponent.find('mat-card');
    this.todoDialogWindow = Selector('.mat-dialog-container');
    this.todoDialogTitle = this.todoDialogWindow.find('#title');
    this.todoDialogDescription = this.todoDialogWindow.find('#description');
    this.updateTodoButton = this.todoDialogWindow.find('button').withText('Update');
  }

  findDialogTextByCssSelector(cssSelector: string, text: string) {
    return Selector(this.todoDialogWindow.find(cssSelector).withExactText(text));
  }
}

