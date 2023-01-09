import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent {

  todoForm !: FormGroup;
  
  constructor(
    private matDialogRef: MatDialogRef<EditTodoComponent>, 
    private formBuilder: FormBuilder,
    private crud : CrudService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataToEdit : any
    ){
    }

    editTodo(){

    }
    cancel(): void {
      this.matDialogRef.close();
    }

    ngOnInit(): void {
      this.todoForm = this.formBuilder.group({
        todoTitle : ['', Validators.required],
        todoText : ['', Validators.required],
        done : false
      })
      this.todoForm.controls['todoTitle'].setValue(this.dataToEdit.todoTitle);
      this.todoForm.controls['todoText'].setValue(this.dataToEdit.todoText);
      this.todoForm.controls['done'].setValue(this.dataToEdit.done);
    }
}
