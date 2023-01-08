import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

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
    private db : ApiService
    ){

  }

  cancel(): void {
    this.matDialogRef.close();
  }

  
  addTodo(): void {
    if(this.todoForm.valid){
      this.db.postTodo(this.todoForm.value).subscribe({
        next:(res)=>{
          this.todoForm.reset();
          this.matDialogRef.close();
        },
        error:()=>{
          alert("Error")
        }
      })
    }
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      todoTitle : ['', Validators.required],
      todoText : ['', Validators.required]
    })
  }
}
