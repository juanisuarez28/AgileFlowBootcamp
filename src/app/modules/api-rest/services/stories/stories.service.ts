import { Injectable} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Story } from 'src/app/modules/models/cstory.model';

@Injectable({
  providedIn: 'root'
})
export class StoriesService{
  

  lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio natus, nam consequatur perspiciatis repellat voluptates eum. Eum quae minima dolore fugit temporibus. Quasi, nulla dignissimos qui ut suscipit totam! Deserunt!"

  stories : Story[] = [
    {
      name: 'Creacion de las user storys necesarias',
      description: this.lorem,
      epic: "id",
      sprint: 'sprint',
      owner: 'owner',
      assignedTo: 'Facu, Lauta, Juani',
      points: 2,
      created: new Date(),
      due: new Date(),
      started: new Date(),
      finished: new Date(),
      status: 'status',
      icon: 'icon',
    },
    {
      name: 'story testing 2 ',
      description: this.lorem,
      epic: "id",
      sprint: 'sprint',
      owner: 'owner',
      assignedTo: 'assigned to',
      points: 2,
      created: new Date(),
      due: new Date(),
      started: new Date(),
      finished: new Date(),
      status: 'status',
      icon: 'icon',
    },
    {
      name: 'story testing 3 ',
      description: this.lorem,
      epic: "id",
      sprint: 'sprint',
      owner: 'owner',
      assignedTo: 'assigned to',
      points: 2,
      created: new Date(),
      due: new Date(),
      started: new Date(),
      finished: new Date(),
      status: 'status',
      icon: 'icon',
    },
    {
      name: 'story testing 4 ',
      description: this.lorem,
      epic: "id",
      sprint: 'sprint',
      owner: 'owner',
      assignedTo: 'assigned to',
      points: 2,
      created: new Date(),
      due: new Date(),
      started: new Date(),
      finished: new Date(),
      status: 'status',
      icon: 'icon',
    },
  ];
  private stories$ = new Subject<Story[]>

  storiesData: BehaviorSubject<Story[]> = new BehaviorSubject<Story[]>(this.stories)


  constructor(){}


  public getStories$(){
    return this.storiesData.asObservable();
  }

  public addStory(newStory: Story) {
    this.stories.unshift(newStory)
    this.stories$.next(this.stories); 
  }

  public deleteStory(id : number){
    this.stories.splice(id, 1)
  }

  public editStory(story : Story, id : number) {
    throw new Error('Method not implemented.');
  }

}
