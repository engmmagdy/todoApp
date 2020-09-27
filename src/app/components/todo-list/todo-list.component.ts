import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
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


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.beforeEditCach = '';
    this.todoTitle = '';
    this.todoId = 8;
    this.modalPopup = false;
    this.apiService.getTodoList().subscribe((oDataResult) => {
      this.todos = oDataResult.todos;
    });

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
  }


  editTodo(todo: Todo): void {
    this.beforeEditCach = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.beforeEditCach;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCach;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  showPopup(): void {
    this.modalPopup = true;
  }

  hidePopup(): void {
    this.modalPopup = false;
  }


}
