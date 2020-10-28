import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { Todo } from '../../interface/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  todoId: number;
  modalPopup: boolean;
  beforeEditCach: string;
  validInput: FormGroup;
  direction: string;

  constructor(private apiService: APIService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.direction = 'ltr';
    this.beforeEditCach = '';
    this.todoTitle = '';
    this.todoId = 8;
    this.modalPopup = false;
    this.apiService.getTodoList().subscribe((oDataResult) => {
      this.todos = oDataResult.todos;
      this.getLocalStorageTodo();
    });
    this.initForm();
  }

  directionCheck(event): void {
    const checkBox = event.target.checked;
    if (checkBox !== true) {
      this.direction = 'ltr';
    } else { this.direction = 'rtl'; }
  }

  getLocalStorageTodo(): void {
    if (localStorage.getItem('todos') !== null) {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    }
  }

  setLocalStorage(): void {
    localStorage.setItem('todos',
      JSON.stringify(this.todos)
    );
  }

  initForm(): void {
    this.validInput = this.fb.group({
      todoName: [' ', Validators.required],
    });
  }

  isValidInput(fieldName): boolean {
    return this.validInput.controls[fieldName].invalid &&
      (this.validInput.controls[fieldName].dirty || this.validInput.controls[fieldName].touched);
  }

  addTodoValid(): void {
    console.log(this.validInput.value);
  }




  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: this.todoId,
      name: this.todoTitle,
      complete: false,
      editing: false,
      date: '18/09/2020'
    });
    this.todoTitle = '';
    this.todoId++;
    this.modalPopup = false;
    this.setLocalStorage();
  }


  editTodo(todo: Todo): void {
    this.beforeEditCach = todo.name;
    todo.editing = true;
    this.setLocalStorage();
  }


  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.beforeEditCach;
    }
    todo.editing = false;
    this.setLocalStorage();
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCach;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.setLocalStorage();
  }

  showPopup(): void {
    this.modalPopup = true;
  }

  hidePopup(): void {
    this.modalPopup = false;
    this.todoTitle = '';
    this.validInput = this.fb.group({
      todoName: [' '],
    });
  }




}
