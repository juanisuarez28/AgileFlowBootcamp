import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../models/cproject.model';
import { Observable, Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../proyect/delete-dialog/delete-dialog.component';
import { ProjectDialogComponent } from './project-dialog/project.dialog.component';

@Component({
  selector: 'app-proyect-list',
  templateUrl: './proyect-list.component.html',
  styleUrls: ['./proyect-list.component.scss']
})  
export class ProyectListComponent implements OnInit, OnDestroy{
  projects : Project[]=[];
  projects$: Observable<Project[]> = new Observable<Project[]>();
  projectsServiceSubscription: Subscription = new Subscription();

  constructor( public projectsService : ProjectsService, public dialog : MatDialog){
    
  }

  ngOnInit(): void {
    this.projectsService.getProjectApi();
    //this.projects$ = this.projectsService.getProjects$(); // se accede al observable
    //this.projectsServiceSubscription=this.projects$.subscribe(projects => this.projects = projects);// nos suscribimos a los cambios
  }

  newProjectDialog(): void{
    let dialogRef=this.dialog.open(ProjectDialogComponent,{
      data: {option: " Agregar nuevo",name: "", members: [""], description: "", }
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log(result.value);
      this.newProject(result.value);
    })
  }

  editProjectDialog(project: Project, id:number): void{
    let dialogRef=this.dialog.open(ProjectDialogComponent,{
      data: { option: " Editar", name: project.getName(), members: project.getMembers(), description: project.getDescription(),}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log(result.value);
      this.projectsService.editProject(result.value, id);
    })
  }

  deleteProject(project : Project){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {type: "Proyecto ", name:project.getName()},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The DELETE dialog was closed');
      console.log('result: ' + result.name);
      this.projectsService.deleteProject(project.getId());
    });
  }

  newProject(value: string){
    this.projectsService.newProject(value);
  }

  ngOnDestroy(): void {
    this.projectsServiceSubscription.unsubscribe();
  }
}


