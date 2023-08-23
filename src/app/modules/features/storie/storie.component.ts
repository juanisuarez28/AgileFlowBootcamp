import { Component, Input } from '@angular/core';
import { Story } from '../../models/cstory.model';
import { Task } from '../../models/ctask.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../core/services/tasks/tasks.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-storie',
  templateUrl: './storie.component.html',
  styleUrls: ['./storie.component.scss']
})
export class StorieComponent {
@Input() story !: Story;

tasks : Task[] = [];
tasks$ : Observable<Task[]> = new Observable<Task[]>();
tasksSubscription : Subscription = new Subscription();

constructor(private ts : TasksService, public dialog : MatDialog){}


ngOnInit() : void {
  this.tasks$ = this.ts.getTasks$();
  let tasksSubscription = this.tasks$.subscribe((tasks) => (this.tasks = tasks));
  
}

addTask(){
  let dialogRef = this.dialog.open(TaskFormComponent, {
    data : {name : '', description : "" , story : this.story, created : new Date(), due : new Date(), done : false}
  })

  dialogRef.afterClosed().subscribe(result =>{
    if(result.value != undefined){
      this.ts.addTask(result.value)
    }
  })
}

updateTask(task : Task, id : number){
  let dialogRef = this.dialog.open(TaskFormComponent,{
    data : {name : task.name, description : task.description , story : task.story, created : task.created, due : task.due, done : task.done}
  })

  dialogRef.afterClosed().subscribe(result =>{
    if (result!= undefined){
      this.ts.editTask(result.value, id);
    }
  })
}

deleteTask(task : Task, id: number){
  let dialogRef = this.dialog.open(DeleteDialogComponent,{
    data: {type: "Tarea ", name:task.name},  
  });

  dialogRef.afterClosed().subscribe((result) =>{
    if (result === true){
      this.ts.deleteTask(id)
    }
  });
}

toggleTask(id : number ){
  this.ts.toggleTask(id);
}

ngOnDestroy(){
  this.tasksSubscription.unsubscribe();
}

}
