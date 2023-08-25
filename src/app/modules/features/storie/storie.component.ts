import { Component, Input } from '@angular/core';
import { Story } from '../../models/cstory.model';
import { Task } from '../../models/ctask.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../core/services/tasks/tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { StoriesService } from '../../core/services/stories/stories.service';
import { StoryFormComponent } from '../story-form/story-form.component';

@Component({
  selector: 'app-storie',
  templateUrl: './storie.component.html',
  styleUrls: ['./storie.component.scss'],
})
export class StorieComponent {
  projectId: string;
  epicId: string;
  storyId: string;

  showStory : boolean = false;
  errorGetStory: boolean = false;


  story !: Story;

  tasks: Task[] = [];
  tasksSubscription: Subscription = new Subscription();
  errorGetTasks: boolean = false;
  errorNoTasks: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ts: TasksService,
    public dialog: MatDialog,
    public storiesService: StoriesService
  ) {
    this.projectId = this.route.snapshot.params['projectId'];
    this.epicId = this.route.snapshot.params['epicId'];
    this.storyId = this.route.snapshot.params['storieId'];

    console.log(this.projectId);
    console.log(this.epicId);
    console.log(this.storyId);
  }

  ngOnInit(): void {
    this.getStory();
    this.getTasks();
  }

  getStory(){
    this.storiesService.getStoryById(this.storyId).subscribe(response =>{
      if(response.status =="success"){
        this.story = response.data
        console.log(this.story);
        
        this.showStory = true;
      }else{
        this.errorGetStory = true
        
      }
    })
  }

  getTasks() {
    this.ts.getTasksApi(this.storyId).subscribe((response) => {
      if (response.status == 'success') {
        this.tasks = response.data;        
        if (this.tasks.length == 0) {
          this.errorNoTasks = true;
        }
      } else {
        this.errorGetTasks = true;
      }
    });
  }

  addTask() {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        name: '',
        description: '',
        story: this.storyId,
        created: new Date(),
        due: new Date(),
        done: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.value != undefined) {
        this.newTask(result.value);
      }
    });
  }

  newTask(newTask: formTask) {
    this.ts.newTask(newTask).subscribe((response) => {
      if ((response.succes = 'succes')) {
        this.getTasks();
      }
    });
  }

  updateTask(task: Task): void {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        name: task.name,
        description: task.description,
        story: task.story,
        created: task.created,
        due: task.due,
        done: task.done,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ts.editTask(result.value, task._id).subscribe((response) => {
        if ((response.success = 'success')) {
          this.getTasks();
        }
      });
    });
  }

  deleteTask(task: Task, type: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: "Task", name : task.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result ===true){
        this.ts.deleteTask(task._id).subscribe(response => {
          if(response.success = "success"){
            this.getTasks();
          }else{
            //handle error
          }
        })
      }
    });
  }

  updateStory(){
    
    console.log("update");
    
    let dialogRef = this.dialog.open(StoryFormComponent,{
      data : {name : this.story.name, description : this.story.description, 
        epic : this.story.epic ,sprint: this.story.sprint, owner : this.story.owner,
        assignedTo : this.story.assignedTo, points : this.story.points,
        created: this.story.created, due :this.story.due, start :this.story.started,
        end :this.story.finished, status : this.story.status, option : 'Edit'}
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.storiesService.editStory(result.value, this.storyId).subscribe((response) => {
        console.log(response);
        
        if ((response.status = 'success')) {
          this.getStory();
        }
      });
    });
  }

}

export interface formTask {
  name: string;
  description: string;
  due: Date;
}
