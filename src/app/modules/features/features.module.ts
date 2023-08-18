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
import { SharedModule } from '../shared/shared.module';
import { MyStoriesComponent } from './my-stories/my-stories.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EpicFormComponent } from './proyect/epic-form/epic-form.component';
import { MaterialModule } from '../material/material.module';
import { StoryFormComponent } from './story-form/story-form.component';

import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

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
    MyStoriesComponent,
    StoryFormComponent,
    EpicFormComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FeaturesModule {}
