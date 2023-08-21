import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() title = ""; 
  @Input() description = ""; 
  @Input() created !: Date; 
  @Input() due !: Date;
  @Input() done : boolean = false; 

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
