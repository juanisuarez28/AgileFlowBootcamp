import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/cproject.model';
import { Observable } from 'rxjs';
import { ProjectService } from '../../core/services/projects/project.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../proyect/delete-dialog/delete-dialog.component';
import { ProjectDialogComponent } from './project-dialog/project.dialog.component';

@Component({
  selector: 'app-proyect-list',
  templateUrl: './proyect-list.component.html',
  styleUrls: ['./proyect-list.component.scss']
})  
export class ProyectListComponent implements OnInit{
  projects : Project[]=[];
  projects$: Observable<Project[]> = new Observable<Project[]>();

  constructor( public projectService : ProjectService, public dialog : MatDialog){
    
  }

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects$(); // se accede al observable
    this.projects$.subscribe(projects => this.projects = projects);// nos suscribimos a los cambios

    const project1= new Project(["Juani", " Lauta", " Facu"], 1, "Grupo 1", "Trabajo final del bootcamp de front", "x", "messi", 2);
    const project2= new Project(["Ximena", " Luciana"], 2, "Grupo 2", "Trabajo final del bootcamp de front", "x", "messi", 2);
    const project3= new Project(["Thomas"], 3, "Grupo 3", "Trabajo final del bootcamp de front individual", "x", "messi", 2);
    const project4= new Project(["Gonzalo"], 4, "Grupo 4", "Trabajo final del bootcamp de front individual", "x", "messi", 2);
    const project5= new Project(["Ignacio"], 5, "Grupo 5", "Trabajo final del bootcamp de front individual", "x", "messi", 2);

    this.projectService.addProject(project1);
    this.projectService.addProject(project2);
    this.projectService.addProject(project3);
    this.projectService.addProject(project4);
    this.projectService.addProject(project5);

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
      this.projectService.editProject(result.value, id);
    })
  }

  deleteProject(project : Project){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {type: "Proyecto ", name:project.getName()},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The DELETE dialog was closed');
      console.log('result: ' + result.name);
      this.projectService.deleteProject(project.getId());
    });
  }

  newProject(value: string){
    this.projectService.newProject(value);
  }
}


