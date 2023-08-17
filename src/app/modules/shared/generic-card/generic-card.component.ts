import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss']
})
export class GenericCardComponent {
  @Input() title='Titulo:...';
  @Input() description='Descripcion: ....';

  @Output() editOutPut = new EventEmitter();
  @Output() deleteOutPut = new EventEmitter();

  editEvent(){
    console.log("editEvent");
    
    this.editOutPut.emit()
  }
  
  deleteEvent(){
    console.log("deleteEvent");
    
    this.deleteOutPut.emit()

  }
}
