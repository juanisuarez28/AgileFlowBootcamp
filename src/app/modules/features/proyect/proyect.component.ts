import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EpicFormComponent } from './epic-form/epic-form.component';
import { ProjectService } from '../../core/services/project.service';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.scss']
})
export class ProyectComponent implements OnInit, OnDestroy {
  
  epics: epica[] =[]
  projectId: string="";

  projectServiceSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private projectService : ProjectService) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId')

    this.projectServiceSubscription = this.projectService.epics$.subscribe(result =>{
      this.epics=result;
      console.log("resultado: ", result);
    })

    if (projectId != null){
      this.projectId= projectId;
      this.projectService.getEpics(projectId);
    }
  }


  newEpicDialog(): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: this.projectId, name: "", description: "", icon: "", option:" Add new" },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined){
        this.projectService.saveEpic(result.value);
      }
    });
  }

  editDialog(epica: epica,i:number): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: epica.project, name: epica.name, description: epica.description, icon: epica.icon, option:"Edit" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined){
        this.projectService.editEpic(result.value,i)
      }
    });
  }
  deleteDialog(epica: epica,i:number): void {    
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: epica.name,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The DELETE dialog was closed');
      console.log('result: ' + result);
      this.projectService.deleteEpic(result,i, epica.project)
    });
  }
  
  ngOnDestroy(): void {
    this.projectServiceSubscription.unsubscribe();
  }

}

interface epica {

  project: string;
  name: string;
  description: string;
  icon: string;
}

