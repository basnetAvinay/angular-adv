import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from './todo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {StoreModule} from '@ngrx/store';
import {todoFeatureKey, todoReducer} from './store/todo.reducer';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {TodoEffects} from './store/todo.effects';

const routes: Routes = [
  {path: '', component: TodoComponent}
];

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(todoFeatureKey, todoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
  exports: [
    RouterModule
  ]
})
export class TodoModule { }
