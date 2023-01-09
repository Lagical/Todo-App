import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { CrudService } from './services/crud.service';

interface Todo {  
  todoTitle: string;
  todoText: string;
  id: number;
  done: boolean;
}  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Todo-App';

  todos: Todo[] = [];
  
  constructor(
    private matDialog: MatDialog,
    private crud : CrudService,
    ){
  }

  openDialog(){
    this.matDialog.open(FormComponent);
  }
  

  ngOnInit(): void {
    this.crud.getTodo().subscribe({
      next:(all)=>{
        this.todos = all;
      },
      error:()=>{
      }
    });
  }
}
