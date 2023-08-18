import { Component, Inject } from '@angular/core';
import { ProyectComponent } from '../proyect.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProyectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: deleteData,


  ) { }

  deleteEpic(){
    console.log("Delete epic");
    this.dialogRef.close(this.data);
  }
}

export interface deleteData{
  type: string;
  name: string;
}
