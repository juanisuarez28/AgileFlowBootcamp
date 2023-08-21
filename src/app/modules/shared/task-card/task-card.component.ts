import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/ctask.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task !: Task; 

  @Output() editOutPut = new EventEmitter();
  @Output() deleteOutPut = new EventEmitter();
  @Output() toggleOutPut = new EventEmitter();



  editEvent(){
    this.editOutPut.emit();
  }

  deleteEvent(){
    this.deleteOutPut.emit();
  }

  doneToggle(){
    this.toggleOutPut.emit();
    
  }


}
