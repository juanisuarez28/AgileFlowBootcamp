import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ProyectListComponent } from './proyect-list/proyect-list.component';
import { EpicComponent } from './epic/epic.component';
import { ProyectComponent } from './proyect/proyect.component';
import { StorieComponent } from './storie/storie.component';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';
import { PresentationModule } from '../presentation.module';



@NgModule({
  imports: [
    CommonModule,
    PresentationModule
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
    HomeComponent
  ]
})
export class FeaturesModule { }
