import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ProyectListComponent } from './proyect-list/proyect-list.component';
import { EpicComponent } from './epic/epic.component';
import { ProyectComponent } from './proyect/proyect.component';
import { StorieComponent } from './storie/storie.component';
import { TaskComponent } from './task/task.component';
import { PresentationModule } from '../presentation.module';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    PresentationModule,
    RouterModule
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    ProyectListComponent,
    EpicComponent,
    ProyectComponent,
    StorieComponent,
    TaskComponent
  ],
  exports:[
    MainComponent,
    HomeComponent,
    ProyectComponent,
    ProyectListComponent,
    EpicComponent,
    StorieComponent,
    TaskComponent
  ]
})
export class FeaturesModule { }
