import { Component, Inject } from '@angular/core';
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

    //update new data from form to db.json based on id
    updateTodo(){
      this.crud.updateTodo(this.todoForm.value, this.dataToEdit.id)
      .subscribe({
        next:()=>{
          this.crud.updateTodos();
          this.todoForm.reset();
          this.matDialogRef.close();
          this.openSnackBar();
        },
        error:()=>{
        }
      })
    }

    //alert lasting 5 seconds
    openSnackBar() {
      this.snackBar.open("Todo successfully updated", "Close",{ 
        duration: 5000
    });
    }

    //close dialog without doing actions
    cancel(): void {
      this.matDialogRef.close();
    }

    //create and prefill form
    ngOnInit(): void {
      this.todoForm = this.formBuilder.group({
        todoTitle : ['', [Validators.required, Validators.maxLength(15)]],
        todoText : ['', Validators.required],
        done : false
      })
      this.todoForm.controls['todoTitle'].setValue(
        this.dataToEdit.todoTitle);
      this.todoForm.controls['todoText'].setValue(
        this.dataToEdit.todoText);
      this.todoForm.controls['done'].setValue(
        this.dataToEdit.done);
    }
    
}
