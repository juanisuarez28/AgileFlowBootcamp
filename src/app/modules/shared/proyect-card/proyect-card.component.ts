import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Project } from '../../models/cproject.model';
@Component({
  selector: 'app-proyect-card',
  templateUrl: './proyect-card.component.html',
  styleUrls: ['./proyect-card.component.scss']
})
export class ProyectCardComponent {

  @Input() project!: Project;
  @Input() mostrarDelete: boolean = false;
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
