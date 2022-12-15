import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from './todo.model';
import {FormControl, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {deleteTodo, saveOrUpdateTodo} from './store/todo.actions';
import {selectTodos} from './store/todo.selector';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();

  todos: Todo[] = [];
  todoDescriptionFormControl = new FormControl('', [Validators.required]);
  todoIdFormControl = new FormControl(null, [Validators.required]);

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectTodos),
      takeUntil(this.unsubscribe)
    ).subscribe(items => this.todos = items);
  }

  undoOrCompleteTodo(todo: Todo) {
    this.store.dispatch(saveOrUpdateTodo({todo, isUpdate: true}));
  }

  deleteTodo(todoId: number): void {
    this.store.dispatch(deleteTodo({todoId}));
  }

  addTodo(): void {
    if (this.todoIdFormControl.value && this.todoIdFormControl.value >= 0 && !this.todos.find(t => t.id === this.todoIdFormControl.value)) {
      const todo: Todo = {
        id: this.todoIdFormControl.value,
        description: this.todoDescriptionFormControl.value ?? '',
        done: false
      }
      this.store.dispatch(saveOrUpdateTodo({todo, isUpdate: false}));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
