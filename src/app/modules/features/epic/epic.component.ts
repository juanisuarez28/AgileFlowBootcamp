import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Story } from 'src/app/modules/models/cstory.model';
import { StoriesService } from '../../api-rest/services/stories/stories.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { StoryFormComponent } from '../story-form/story-form.component';
import { Epic } from '../../models/cepic.model';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
})
export class EpicComponent implements OnInit {
  @Input() epic !: Epic;
  stories: Story[] = [];
  stories$: Observable<Story[]> = new Observable<Story[]>();
  storiesSubscription : Subscription = new Subscription();
  constructor(private ss: StoriesService, public dialog: MatDialog) {
  
  }

  ngOnInit(): void {
    this.stories$ = this.ss.getStories$();
    let storiesSubscription = this.stories$.subscribe((stories) => (this.stories = stories));
  }


  addStory() {
    let dialogRef = this.dialog.open(StoryFormComponent,{
      data : {name : '', description : '', epic : this.epic ,sprint: '', owner : '',assignedTo : [], points : '',created: new Date(), due :'', start :'', end :'', status : '', option : 'Add new story'}
    })

    dialogRef.afterClosed().subscribe(result =>{
      console.log(result.value);
      
      if (result.value != undefined){
        this.ss.addStory(result.value)
      }
    })
  }

  updateStory(story : Story, id : number){
    let dialogRef = this.dialog.open(StoryFormComponent,{
      data : {name : story.name, description : story.description, epic : story.epic ,sprint: story.sprint, owner : story.owner,assignedTo : story.assignedTo, points : story.points,created: story.created, due :story.due, start :story.started, end :story.finished, status : story.status, option : 'Edit'}
    })

    dialogRef.afterClosed().subscribe(result =>{
      
      if (result.value != undefined){
        this.ss.editStory(result.value, id)
      }
  })
  }

  deleteStory(id: number, type : string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data : {
        id : id,
        type : type
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.ss.deleteStory(id);
      }
    });
  }


  ngOnDestroy(){
    this.storiesSubscription.unsubscribe();
  }

  
}

