import { waitForAngular } from 'testcafe-angular-selectors';
import { LoginPage } from '../pages/loginPage';
import { TodoPage } from '../pages/todoPage';
import { NavPage } from '../pages/navPage';

const loginPage = new LoginPage();
const todoPage = new TodoPage();
const navPage = new NavPage();


fixture('Todo App Login')
  .page('localhost:4200')
  .beforeEach(async () => {
    await waitForAngular();
  });

test('invalid login', async (t) => {
  await (t)
    .typeText(loginPage.usernameInput, '1234')
    .typeText(loginPage.passwordInput, '1234')
    .click(loginPage.loginButton)
    .expect(loginPage.loginFailedMessage.visible).ok();
});

test('valid login', async (t) => {
  await (t)
  .typeText(loginPage.usernameInput, 'pdavis')
  .typeText(loginPage.passwordInput, '1234')
  .click(loginPage.loginButton);
});

const title = 'testcafe todo title';
const description = 'testcafe todo description';

fixture('todo: create, read, update, delete')
  .page('localhost:4200/todo')
  .beforeEach(async t => {
    await waitForAngular();
    await t
      .typeText(loginPage.usernameInput, 'pdavis')
      .typeText(loginPage.passwordInput, '1234')
      .click(loginPage.loginButton);
  });

test('create and save new todo', async t => {

  await t
    // fill out form and click save button
    .typeText(todoPage.createTodoTitleInput, 'testcafe title')
    .typeText(todoPage.createTodoDescriptionInput, 'testcafe description')
    .click(todoPage.createTodoSaveButton)
    // new todo should be added to the list, check title and description
    .expect(todoPage.todoCards.nth(-1).find('h1').withExactText(title)).ok()
    .expect(todoPage.todoCards.nth(-1).find('p').withExactText(description)).ok()
    // click created todo, check that dialog window appears
    .click(todoPage.todoCards.nth(-1))
    .expect(todoPage.todoDialogWindow.exists).ok()
    // check dialog title and description fields
    .expect(todoPage.findDialogTextByCssSelector('h1', title)).ok()
    .expect(todoPage.findDialogTextByCssSelector('p', description)).ok();
});

test('update todo', async t => {

  const updatedTitle = 'testcafe updated title';
  const updatedDescription = 'testcafe updated description';
  const todoIndex = 0;

  await t
    // click first todo
    .click(todoPage.todoCards.nth(todoIndex))
    // enter updated title and description
    .selectText(todoPage.todoDialogTitle)
    .typeText(todoPage.todoDialogTitle, updatedTitle)
    .selectText(todoPage.todoDialogDescription)
    .typeText(todoPage.todoDialogDescription, updatedDescription)
    // click update button
    .click(todoPage.updateTodoButton)
    // check todo card displays updated details
    .expect(todoPage.todoCards.nth(todoIndex).find('#title').withExactText(updatedTitle)).ok()
    .expect(todoPage.todoCards.nth(todoIndex).find('#description').withExactText(updatedDescription)).ok();
});

test('delete todo', async t => {

  const todoIndex = 0;

  await t
    // click first todo
    .click(todoPage.todoCards.nth(todoIndex))
    .click(todoPage.deleteTodoButton);
});

test('logout', async t => {
  await t
    .maximizeWindow()
    .click(navPage.logOutButton);
});


