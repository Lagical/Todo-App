import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {

  constructor(
    private matDialogRef: MatDialogRef<DeleteConfirmComponent>
  ){}

  //close dialog and pass delete string selected-todo component
  delete(){
    this.matDialogRef.close("delete")
  }
}
