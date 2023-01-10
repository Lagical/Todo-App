import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck, switchMap } from 'rxjs';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { CrudService } from '../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

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

  constructor(
    private crud : CrudService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
    ){
  }

  //check checkbox value and update json "db"
  checkCheckBoxvalue(event: any, data: any){
    data.done = event.checked;
    this.crud.updateTodo(data, data.id)
      .subscribe({
        next:(all)=>{
          this.crud.updateTodos();
        },
        error:()=>{
        }
      })
  }

  //alert lasting 5 seconds
  openSnackBar() {
    this.snackBar.open("Todo successfully deleted", "Close",{ 
      duration: 5000
  });
  }

  //open new dialog with prefilled form based on id, update json "db" after done editing
  editTodo(todo: any){
    this.matDialog.open(EditTodoComponent,{
      data: todo
    })
    .afterClosed()
    .subscribe(value=>{
      this.getTodosToUpdate();
    })
  }

  //open new dialog to confirm deletion of selected todo
  openDelete(id: number){
    this.matDialog.open(DeleteConfirmComponent).afterClosed()
    .subscribe(value=>{
      if(value === "delete"){
        this.deleteTodo(id);
      }
    })
  }

  //delete todo based on id and update json "db"
  deleteTodo(id: number){
    this.crud.deleteTodo(id).subscribe({
      next:(all)=>{
        this.crud.updateTodos();
        this.openSnackBar();
        this.getTodosToUpdate();
      },
      error:()=>{
      }
    }
    )
  }

  //get correct json "db" data to be displayed by id 
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
  }
}
