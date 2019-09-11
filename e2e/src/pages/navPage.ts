import { AngularSelector } from 'testcafe-angular-selectors';

export class NavPage {
  navComponent = AngularSelector('app-navbar');
  logOutButton: any;
  constructor() {
    this.logOutButton = this.navComponent.find('button').withText('Logout');
  }
}
