import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ProyectListComponent } from './proyect-list/proyect-list.component';
import { ProyectComponent } from './proyect/proyect.component';
import { EpicComponent } from './epic/epic.component';
import { StorieComponent } from './storie/storie.component';
import { TaskComponent } from './task/task.component';
import { SettingsComponent } from './settings/settings.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'my-proyects', component: ProyectListComponent },
      { path: 'my-proyects/:proyectId', component: ProyectComponent },
      { path: 'my-proyects/:proyectId/:epicId', component: EpicComponent },
      { path: 'my-proyects/:proyectId/:epicId/:storieId', component: StorieComponent },
      { path: 'my-proyects/:proyectId/:epicId/:storieId/:taskId', component: TaskComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'my-stories', component: MyStoriesComponent },

    ]
  } 
  ,];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
