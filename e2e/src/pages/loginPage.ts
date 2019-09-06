import { Selector } from 'testcafe';

export class LoginPage {
  usernameInput: Selector;
  passwordInput: Selector;
  loginButton: Selector;
  loginFailedMessage: Selector;

  constructor () {
    this.usernameInput = Selector('#userName');
    this.passwordInput = Selector('#password');
    this.loginButton = Selector('button').withText('Login');
    this.loginFailedMessage = Selector('#login-error-message');
  }
}
