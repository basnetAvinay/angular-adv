import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './forms/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todo', loadChildren: () => import('./forms/todo/todo.module').then(m => m.TodoModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
