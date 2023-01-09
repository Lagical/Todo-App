import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, switchMap } from 'rxjs';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { CrudService } from '../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  todos$!: Observable<Todo>;
  @Output() parentFunction: EventEmitter<any>= new EventEmitter();

  constructor(
    private crud : CrudService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
    ){
  }

  checkCheckBoxvalue(event: any, data: any){
    data.done = event.checked;
    console.log(data);
    this.crud.updateTodo(data, data.id)
      .subscribe({
        next:(all)=>{
          
        },
        error:()=>{
        }
      })
  }

  openSnackBar() {
    this.snackBar.open("Todo successfully deleted", "Close");
  }

  editTodo(todo: any){
    this.matDialog.open(EditTodoComponent,{
      data: todo
    })
    .afterClosed()
    .subscribe(value=>{
      this.getTodosToUpdate();
    })
  }

  deleteTodo(id: number){
    this.crud.deleteTodo(id).subscribe({
      next:(all)=>{
        this.openSnackBar();
        this.getTodosToUpdate();
      },
      error:()=>{
      }
    }
    )
  }

  getTodosToUpdate(){
    this.todos$ = this.activatedRoute.params.pipe(
      pluck("id"),
      switchMap((id) =>
        this.http.get<Todo>(
          `http://localhost:3000/todoList/${id}`
        )
      )
    );
  }

  ngOnInit(): void {
    this.getTodosToUpdate();
    this.parentFunction.emit()
  }
}
