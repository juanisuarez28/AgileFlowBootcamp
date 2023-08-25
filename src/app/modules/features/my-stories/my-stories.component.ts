import { Component } from '@angular/core';
import { StoriesService } from '../../core/services/stories/stories.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Story } from '../../models/cstory.model';
import { StoryFormComponent } from '../story-form/story-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent {

  constructor(private ss: StoriesService, public dialog: MatDialog, private route: ActivatedRoute) {}

  stories !: Story[];
  cantStoriesIsZero: boolean = false;
  errorGetStories : boolean = false;
  showStories : boolean = false;

  ngOnInit(){
    this.getStories();
  }

  getStories(){
    
    this.ss.getAllStories().subscribe(response => {
      if(response.status == "success"){
        this.stories = response.data;
        this.showStories = true;
        if(this.stories.length == 0){
          this.cantStoriesIsZero = true;
        }else{
          this.errorGetStories = true;
        }
      }
    })
  }

  updateStory(story : Story){
    let dialogRef = this.dialog.open(StoryFormComponent,{
      data : {name : story.name, description : story.description, epic : story.epic ,sprint: story.sprint, owner : story.owner,assignedTo : story.assignedTo, points : story.points,created: story.created, due :story.due, start :story.started, end :story.finished, status : story.status, option : 'Edit'}
    })

    dialogRef.afterClosed().subscribe(result =>{
      
      if (result.value != undefined){
        this.ss.editStory(result.value, story.getId()).subscribe(resp =>{
          console.log( "respuesta de edicion de una storie: ", resp)
          if (resp.status == "success"){
            this.getStories();
          }
        })
      }
  })
  }

  deleteStory(story: Story) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {type: "Story ", name: story.name},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.ss.deleteStory(story.getId()).subscribe(resp =>{
          console.log("Storie a eliminar: ", resp);
          if(resp.status =="success"){
            console.log("exito al eliminar story");
            this.getStories();
          }else{
            console.log("error al eliminar story");
            
          }
        });
      }
    });
  }

  

  
}
