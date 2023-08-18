import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Project } from 'src/app/modules/models/cproject.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
 
  private projects : Project[]= [];
  
  private projects$ = new Subject<Project[]>();

  constructor() {

  }

  public newProject(value: any) {
    let newId=this.projects[this.projects.length-1].getId()+1;
    let aux= new Project(value.members, newId, value.name, value.description, "x", "messi", 2);

    this.projects.push(aux);
    this.projects$.next(this.projects);
  }

  public getProjects$(): Observable<Project[]> {
    return this.projects$.asObservable();
  }

  public addProject(project: Project) {
    this.projects.push(project);
    this.projects$.next(this.projects); // emitimos el nuevo valor
  }

  public editProject(result: any, idToEdit: number) {    

    const updatedProjects=this.projects.map(proj =>{
      if(proj['_id']=== idToEdit){
        return new Project (result.members,proj['_id'],result.name,result.description,"x","messi",2);
        }
        return proj;
      }
    );
    
    this.projects=updatedProjects;
    this.projects$.next(this.projects);
  }
  



  public deleteProject(id:number){

    this.projects=this.projects.filter(project => project.getId()!==id);
    console.log("Proyecto con id ", id, " eliminado");
    this.projects$.next(this.projects);
  }

}
