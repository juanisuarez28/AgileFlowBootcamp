import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { EpicService } from '../../core/services/epic.service';
import { Project } from '../../models/cproject.model';
import { Epica } from '../../models/epic.modle';
import { EpicFormComponent } from '../../shared/epic-form/epic-form.component';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { ProjectDialogComponent } from '../../shared/project-dialog/project-dialog.component';
import { ProjectsService } from '../../core/services/projects/projects.service';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.scss']
})
export class ProyectComponent implements OnInit {
  
  project!: Project;
  epics: Epica[] =[]
  projectId: string="";
  errorGetEpics : boolean = false;
  cantEpicsIsZero : boolean = false;
  projectServiceSubscription!: Subscription;

  constructor(private route: ActivatedRoute, 
              private dialog: MatDialog, 
              private epicService : EpicService,
              private projectService: ProjectsService) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId')
    
    
    if (projectId != null){
      this.projectId= projectId;
      this.getEpics();
      this.getProject();
    }
  }
  getProject(){
    this.projectService.getProjectById(this.projectId).subscribe( resp =>{
      this.project = resp.data;
    })
  }

  getEpics(){
    this.epicService.getEpics(this.projectId).subscribe( resp=>{
      console.log("Respuesta getEpics form BD ",resp);
      
      if( resp.status == "success"){
        this.epics = resp.data;
        this.errorGetEpics = false;
        if(this.epics.length == 0){
          this.cantEpicsIsZero = true;
        }else{
          this.cantEpicsIsZero = false;
        }
      }else{
        console.log("error al obtener epics");
        this.errorGetEpics = true;
      }
    });
  }

  newEpicDialog(): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: this.projectId, name: "", description: "", icon: "", option:" Add new" },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined){
        this.epicService.saveEpic(result.value).subscribe( resp =>{
          console.log("component response from service of saveEpic: ",resp);
          if (resp.status == "success"){
            this.getEpics();

          }
          
        });
      }
    });
  }

  editDialog(epica: Epica): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: epica.project, name: epica.name, description: epica.description, icon: epica.icon, option:"Edit" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined){
        this.epicService.editEpic(result.value,epica._id).subscribe(resp=>{
          if(resp.status == "success"){
            this.getEpics();
          }
        })
      }
    });
  }

  deleteDialog(epica: Epica): void {    
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:{type:" Epica", name: epica.name},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        console.log('The DELETE dialog was closed');
        console.log('result: ' + result.name);
        this.epicService.deleteEpic(epica._id).subscribe(resp =>{
          console.log("resultado of delete epic :", resp);
          
          if(resp.status == "success"){
            this.getEpics();
          }
        })
      }
    });
  }
  

  editProjectDialog(project: Project): void{
    let dialogRef=this.dialog.open(ProjectDialogComponent,{
      data: { option: " Editar", name: project.getName(), 
              members: project.getMembers(), description: project.getDescription(),
              icon: project.icon}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log("dialog EDIT close, result value: ",result.value);
      this.projectService.editProject(result.value, project.getId()).subscribe( resp =>{
        console.log( "respuesta de EDICION de nuyevo projecto: ", resp)
        if (resp.success = "success"){
          this.getProject();
        }
      });;
    })
  }

  deleteProject(project : Project){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {type: "Proyecto ", name:project.getName()},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      this.projectService.deleteProject(project.getId()).subscribe(resp => {
        if (resp.success = "success"){
          console.log( "Exito al eliminar proyecto: ", resp)
          this.getProject();
        }else{
          console.log("Error al eliminar proyecto ", resp);
          
        }
      });
    });
  }

}

interface epica {

  project: string;
  name: string;
  description: string;
  icon: string;
}

