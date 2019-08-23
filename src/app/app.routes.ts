import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', canActivate: [AuthGuard],
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },
];
