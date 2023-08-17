import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  epics$ = new EventEmitter<epica[]>();

  epics: epica[] = [
    { project: "1", name: "name 1", description: "description 1", icon: "icon 1" },
    { project: "1", name: "name 2", description: "description 2", icon: "icon 2" },
    { project: "1", name: "name 3", description: "description 3", icon: "icon 3" },
  ]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  getEpics(proyectId:string){
    this.epics$.emit(
      this.epics.filter(function(value){
        return value.project === proyectId
      })
    )
  }

  saveEpic(newEpic : epica){
    this.epics.unshift(newEpic);
    this.getEpics(newEpic.project);
  }
  editEpic(editEpic : epica,position : number){
    this.epics[position] = editEpic;
    this.getEpics(editEpic.project);
  }
  deleteEpic(editEpic : string,position : number, project:string){
    console.log("service project, epics[pos]=",this.epics[position].name, " editEpic = ", editEpic," pos: ", position);
    
    if (this.epics[position].name === editEpic){
      
      this.epics.splice(position,1);
      this.getEpics(project);
    }
  }

}


interface epica {

  project: string;
  name: string;
  description: string;
  icon: string;
}
