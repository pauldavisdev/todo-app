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

fixture('Todo App Create')
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
    .expect(todoPage.lastTodoElement.nth(-1).find('h1').withExactText(title)).ok()
    .expect(todoPage.lastTodoElement.nth(-1).find('p').withExactText(description)).ok()
    // click created todo, check that dialog window appears
    .click(todoPage.lastTodoElement.nth(-1))
    .expect(todoPage.todoDialogWindow.exists).ok()
    // check dialog title and description fields
    .expect(todoPage.findDialogTextByCssSelector('h1', title)).ok()
    .expect(todoPage.findDialogTextByCssSelector('p', description)).ok();
});

test('logout', async t => {
  await t
    .maximizeWindow()
    .click(navPage.logOutButton);
});


