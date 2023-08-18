import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EpicComponent } from '../epic/epic.component';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss']
})
export class StoryFormComponent implements OnInit{

  storyForm !: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef : MatDialogRef<EpicComponent>,
     @Inject(MAT_DIALOG_DATA) 
     public data : {epic : string, name : string,
      description : string, points : number, assignedTo: [],
      created : Date, due :Date, start :Date,
      end : Date, status : string, option : string}){}

  ngOnInit(): void {

    this.storyForm = this.fb.group({
      epic : new FormControl(this.data.epic),
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
      points: new FormControl(this.data.points, Validators.required),
      assignedTo: new FormControl(this.data.assignedTo),
      created : new FormControl(this.data.created),
      due: new FormControl(this.data.due),
      started: new FormControl(this.data.start),
      finished: new FormControl(this.data.end),
      status: new FormControl(this.data.status),
    })
  }

  onSubmit(){
    if(this.storyForm.valid){
      this.dialogRef.close(this.storyForm)
    }else{
      console.log("Invalid form");
      
    }
  }
}

