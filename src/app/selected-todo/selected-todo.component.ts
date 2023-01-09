import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, switchMap } from 'rxjs';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { CrudService } from '../services/crud.service';

interface Todo {  
  todoTitle: string;
  todoText: string;
  id: number;
  done: boolean;
}  

@Component({
  selector: 'app-selected-todo',
  templateUrl: './selected-todo.component.html',
  styleUrls: ['./selected-todo.component.css']
})
export class SelectedTodoComponent implements OnInit {

  //todos: Todo[] = [];
  todos$!: Observable<Todo>;

  constructor(
    private crud : CrudService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
    ){
  }

  /*
  ngOnInit(): void {
    this.crud.getTodo().subscribe({
      next:(all)=>{
        this.todos = all;
      },
      error:()=>{
      }
    });
  }*/

  checkCheckBoxvalue(event: any){
    console.log(event.checked);
  }

  editTodo(todo: any){
    this.matDialog.open(EditTodoComponent,{
      data: todo
    })
  }

  ngOnInit(): void {
    this.todos$ = this.activatedRoute.params.pipe(
      pluck("id"),
      switchMap((id) =>
        this.http.get<Todo>(
          `http://localhost:3000/todoList/${id}`
        )
      )
    );
  }
}
