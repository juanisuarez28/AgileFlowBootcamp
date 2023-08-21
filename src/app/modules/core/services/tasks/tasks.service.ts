import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from 'src/app/modules/models/ctask.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks : Task[] = [];
  private tasks$ = new Subject<Task[]>

  tasksData : BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  constructor() { }

  public getTasks$(){
    return this.tasksData.asObservable();
  }

  public addTask(newTask : Task){
    this.tasks.unshift(newTask)
    this.tasks$.next(this.tasks)
  }

  public deleteTask(id : number){
    this.tasks.splice (id, 1);
  }

  public editTask(task : Task, id : number){

  }

}
