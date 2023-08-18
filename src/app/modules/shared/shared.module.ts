import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LabelComponent } from './label/label.component';
import { GenericCardComponent } from './generic-card/generic-card.component';
import { ProyectCardComponent } from './proyect-card/proyect-card.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { DividerComponent } from './divider/divider.component';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ButtonComponent,
    LabelComponent,
    GenericCardComponent,
    ProyectCardComponent,
    TaskCardComponent,
    DividerComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    ButtonComponent,
    LabelComponent,
    GenericCardComponent,
    ProyectCardComponent,
    TaskCardComponent,
    DividerComponent
  ]
})
export class SharedModule { }
