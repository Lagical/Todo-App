import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  todoForm !: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<FormComponent>, 
    private formBuilder: FormBuilder,
    private crud : CrudService,
    private snackBar: MatSnackBar
    ){

  }

  cancel(): void {
    this.matDialogRef.close();
  }

  openSnackBar() {
    this.snackBar.open("Todo successfully added", "Close");
  }


  addTodo(): void {
    if(this.todoForm.valid){
      this.crud.postTodo(this.todoForm.value).subscribe({
        next:()=>{
          this.todoForm.reset();
          this.matDialogRef.close();
          this.openSnackBar();
        },
        error:()=>{
        }
      })
    }
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      todoTitle : ['', Validators.required],
      todoText : ['', Validators.required],
      done : false
    })
  }
}
