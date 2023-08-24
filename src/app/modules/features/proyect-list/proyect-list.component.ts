import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../shared/project-dialog/project-dialog.component';
import { Project } from '../../models/cproject.model';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-proyect-list',
  templateUrl: './proyect-list.component.html',
  styleUrls: ['./proyect-list.component.scss']
})  
export class ProyectListComponent implements OnInit{
  projects : Project[]=[];
  projects$: Observable<Project[]> = new Observable<Project[]>();
  projectsServiceSubscription: Subscription = new Subscription();
  errorGetProjects : boolean = false;
  cantProjectsIsZero : boolean = false;
  

  constructor( public projectsService : ProjectsService, public dialog : MatDialog){
    
  }

  ngOnInit(): void {
    this.getProjects();
    //this.projects$ = this.projectsService.getProjects$(); // se accede al observable
    //this.projectsServiceSubscription=this.projects$.subscribe(projects => this.projects = projects);// nos suscribimos a los cambios
  }
  
  getProjects(){
    this.projectsService.getProjectApi().subscribe( resp => {
      console.log("RESPUESTA API (get) /projects : ",resp);
      if( resp.status == "success"){
        this.projects = resp.data;
        this.errorGetProjects = false;
        if(this.projects.length == 0){
          this.cantProjectsIsZero = true;
        }else{
          this.cantProjectsIsZero = false;
        }
      }else{
        this.errorGetProjects = true;
      }
    });
  }

  newProjectDialog(): void{
    let dialogRef=this.dialog.open(ProjectDialogComponent,{
      data: {option: " Agregar nuevo",name: "", members: [""], description: "", }
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log("dialog close, result value: ", result.value);
      //loading
      this.newProject(result.value);
    })
  }

  editProjectDialog(project: Project): void{
    let dialogRef=this.dialog.open(ProjectDialogComponent,{
      data: { option: " Editar", name: project.getName(), 
              members: project.getMembers(), description: project.getDescription(),
              icon: project.icon}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log("dialog EDIT close, result value: ",result.value);
      //loading true
      this.projectsService.editProject(result.value, project.getId()).subscribe( resp =>{
        console.log( "respuesta de EDICION de nuyevo projecto: ", resp)
        if (resp.success = "success"){
          this.getProjects();
          //loading false
        }
      });
    })
  }

  deleteProject(project : Project){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {type: "Proyecto ", name:project.getName()},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result===true){
        this.projectsService.deleteProject(project.getId()).subscribe(resp => {
          if (resp.success = "success"){
            console.log( "Exito al eliminar proyecto: ", resp)
            this.getProjects();
          }else{
            console.log("Error al eliminar proyecto ", resp);
            
          }
        });
      }
    });
  }

  newProject(newProject: formProject){
    this.projectsService.newProject(newProject).subscribe( resp =>{
      console.log( "respuesta de crearcion de nuevo projecto: ", resp)
      if (resp.success = "success"){
        this.getProjects();
      }
    });
  }
}

export interface formProject{
  name: string;
  members: string[];
  description: string;
  icon: string;
}
