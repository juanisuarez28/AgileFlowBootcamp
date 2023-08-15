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

  public getProjects$(): Observable<Project[]> {
    return this.projects$.asObservable();
  }

  public addProject(project: Project) {
    this.projects.push(project);
    this.projects$.next(this.projects); // emitimos el nuevo valor
  }

}
