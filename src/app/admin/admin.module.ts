import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [ManageUsersComponent, UserListComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
