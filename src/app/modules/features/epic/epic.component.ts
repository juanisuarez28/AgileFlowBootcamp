import { Component, OnInit } from '@angular/core';
import { Story } from 'src/app/modules/models/cstory.model';
import { StoriesService } from '../../core/services/stories/stories.service';
import { MatDialog } from '@angular/material/dialog';
import { StoryFormComponent } from '../story-form/story-form.component';
import { ActivatedRoute } from '@angular/router';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';
import { Epica } from '../../models/epic.modle';
import { EpicService } from '../../core/services/epic.service';
import { EpicFormComponent } from '../../shared/epic-form/epic-form.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { DialogNotificationComponent } from '../../shared/dialog-notification/dialog-notification.component';
import { TasksService } from '../../core/services/tasks/tasks.service';



@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
})
export class EpicComponent implements OnInit {
  epic!: Epica;
  projectId: string | null = "";
  epicId: string = "";
  stories: Story[] = [];
  errorGetStories: boolean = false;
  cantStoriesIsZero: boolean = false;

  constructor(private ss: StoriesService,
    private epicService: EpicService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService,
    private tasksService: TasksService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    const epicId = this.route.snapshot.paramMap.get('epicId');
    //let storiesSubscription = this.stories$.subscribe((stories) => (this.stories = stories));

    if (epicId != null) {
      this.epicId = epicId;
      this.getStories();
      this.getEpic();
    }
  }

  getEpic() {
    this.epicService.getEpicById(this.epicId).subscribe(resp => {
      this.epic = resp.data;
    })
  }

  getStories() {
    this.ss.getStories(this.epicId).subscribe(resp => {
      console.log("Respuesta al hacer getStories ", resp);
      if (resp.status == "success") {
        this.stories = resp.data;
        if (this.stories.length == 0) {
          this.cantStoriesIsZero = true;
        }
      } else {
        this.errorGetStories = true;
      }
    });
  }

  addStory() {
    let dialogRef = this.dialog.open(StoryFormComponent, {
      data: { name: '', description: '', epic: this.epicId, sprint: '', owner: '', assignedTo: [""], points: '', created: new Date(), due: '', start: '', end: '', status: '', option: 'Add new story' }
    })

    dialogRef.afterClosed().subscribe(result => {
      const loading = this.dialog.open(LoadingDialogComponent)
      if (result.value != undefined) {
        this.ss.addStory(result.value).subscribe(resp => {
          loading.close()
          console.log("respuesta de creacion de una nueva storie: ", resp)
          if (resp.status == "success") {
            this.getStories();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success adding Storie: " + result.value.name, mensaje: "The storie has been added" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error adding Storie: " + result.value.name, mensaje: "Error in comunication with Database." }
            })
          }
        })
      }
    })
  }

  updateStory(story: Story) {
    let dialogRef = this.dialog.open(StoryFormComponent, {
      data: { name: story.name, description: story.description, epic: story.epic, sprint: story.sprint, owner: story.owner, assignedTo: story.assignedTo, points: story.points, created: story.created, due: story.due, start: story.started, end: story.finished, status: story.status, option: 'Edit' }
    })

    dialogRef.afterClosed().subscribe(result => {
      const loading = this.dialog.open(LoadingDialogComponent)

      if (result.value != undefined) {
        this.ss.editStory(result.value, story.getId()).subscribe(resp => {
          loading.close()
          console.log("respuesta de edicion de una storie: ", resp)
          if (resp.status == "success") {
            this.getStories();
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Success editing Storie: " + result.value.name, mensaje: "The storie has been edited" }
            })
          } else {
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error editing Storie: " + result.value.name, mensaje: "Error in comunication with Database." }
            })

          }
        })
      }
    })
  }
  //TODO ver si se elimina este metodo
  deleteStory(story: Story) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: "Story ", name: story.name },
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result === true) {
        const loading = this.dialog.open(LoadingDialogComponent)
        let existsTask: boolean = false;
        this.tasksService.getTasksApi(story._id).subscribe(resp => {
          existsTask = (resp.data.length > 0)
          if (!existsTask) {
            this.ss.deleteStory(story.getId()).subscribe(resp => {
              loading.close()
              if (resp.status == "success") {
                console.log("exito al eliminar story");
                this.getStories();
                this.dialog.open(DialogNotificationComponent, {
                  data: { title: "Success deleting Storie: " + story.name, mensaje: "The storie has been deleted" }
                })
              } else {
                this.dialog.open(DialogNotificationComponent, {
                  data: { title: "Error deleting Storie: " + story.name, mensaje: "Error in comunication with Database." }
                })

              }
            });
          } else {
            loading.close()
            this.dialog.open(DialogNotificationComponent, {
              data: { title: "Error deleting Storie: " + story.name, mensaje: "You can't delete it, this storie contains task/s." }
            })
          }
        });
      }
    });
  }

  editDialog(epica: Epica): void {
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { project: epica.project, name: epica.name, description: epica.description, icon: epica.icon, option: "Edit" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.value != undefined) {
        this.epicService.editEpic(result.value, epica._id).subscribe(resp => {
          if (resp.status == "success") {
            this.getEpic();
          }
        })
      }
    });
  }

  deleteDialog(epica: Epica): void {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { type: " Epica", name: epica.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('The DELETE dialog was closed');
        console.log('result: ' + result.name);
        this.epicService.deleteEpic(epica._id).subscribe(resp => {
          if (resp.status == "success") {
            console.log("exito al eliminar la epica", resp);
            this.getEpic();
          } else {
            console.log("Error al eliminar epica", resp);

          }
        })
      }
    });
  }

  getOwner() {
    const user = this.tokenService.getUser();
    return user;
  }


}

