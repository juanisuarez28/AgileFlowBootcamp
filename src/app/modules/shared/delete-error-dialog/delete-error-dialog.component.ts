import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-error-dialog',
  templateUrl: './delete-error-dialog.component.html',
  styleUrls: ['./delete-error-dialog.component.scss']
})
export class DeleteErrorDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: deleteData,
  ) { }

}

export interface deleteData{
  type: string;
  elemento: string;
}
