import { Component,Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Todo-App';

  constructor(private matDialog: MatDialog, private db : ApiService){

  }

  //open dialog component which includes form
  openDialog(){
    this.matDialog.open(FormComponent);
  }

  //get todos from local json server
  getTodos(){
    this.db.getTodo().subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:()=>{
        alert("Error!")
      }
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
