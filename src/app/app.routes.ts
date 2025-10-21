import { Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { TodoComponent } from './components/todo/todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersTableComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'todos', component: TodoComponent },
  { path: '**', redirectTo: 'users' },
];
