import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { EpicComponent } from './epic/epic.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ProyectComponent } from './proyect/proyect.component';
import { ProyectListComponent } from './proyect-list/proyect-list.component';
import { SettingsComponent } from './settings/settings.component';
import { TaskComponent } from './task/task.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    EpicComponent,
    HomeComponent,
    MainComponent,
    ProyectComponent,
    ProyectListComponent,
    SettingsComponent,
    TaskComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule
  ]
})
export class FeaturesModule { }
