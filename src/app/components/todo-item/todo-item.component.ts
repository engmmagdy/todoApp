import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../interface/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: number;

  @Output() checkedItem = new EventEmitter();
  @Output() doubleClickedItem = new EventEmitter();
  @Output() canceledItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();

  constructor() { }


  ngOnInit(): void {
  }


  setLocalStorage(): void {
    localStorage.setItem('todos',
      JSON.stringify(this.todo.complete)
    );
  }

  doneEdit(todo: Todo): void {
    this.checkedItem.emit(todo);
  }

  editTodo(todo: Todo): void {
    this.doubleClickedItem.emit(todo);
  }

  cancelEdit(todo: Todo): void {
    this.canceledItem.emit(todo);
  }

  deleteTodo(todo: Todo): void {
    this.deletedItem.emit(todo.id);
  }

}
