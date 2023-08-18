import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ProyectListComponent } from '../proyect-list.component';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit{

  projectForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProyectListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: proyectoForm,
    private formBuilder : FormBuilder,
  )
  {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name : new FormControl(this.data.name,Validators.required),
      members : new FormControl(this.data.members, Validators.required),
      description : new FormControl(this.data.description, Validators.required)
  })}

  onSubmit(){
    if(this.projectForm.valid){
      this.dialogRef.close(this.projectForm);
    }else{
      console.log("this form is not valid", this.projectForm);
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}


export interface proyectoForm {
  name: string;
  members: string[];
  description: string;
  option: string;
}
