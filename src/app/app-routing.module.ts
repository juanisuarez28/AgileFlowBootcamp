import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/presentation/features/home/home.component';
import { MainComponent } from './modules/presentation/features/main/main.component';
import { ProyectListComponent } from './modules/presentation/features/proyect-list/proyect-list.component';
import { ProyectComponent } from './modules/presentation/features/proyect/proyect.component';
import { EpicComponent } from './modules/presentation/features/epic/epic.component';
import { StorieComponent } from './modules/presentation/features/storie/storie.component';
import { TaskComponent } from './modules/presentation/features/task/task.component';

const routes: Routes = [
  { path: '', component: MainComponent, children:[
    { path: '', component: HomeComponent  },
    { path: 'my-proyects', component: ProyectListComponent  },
    { path: 'my-proyects/:proyectId', component: ProyectComponent  },
    { path: 'my-proyects/:proyectId/:epicId', component: EpicComponent  },
    { path: 'my-proyects/:proyectId/:epicId/:storieId', component: StorieComponent  },
    { path: 'my-proyects/:proyectId/:epicId/:storieId/:taskId', component: TaskComponent  },

  ]  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
