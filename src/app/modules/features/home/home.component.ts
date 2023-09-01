import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Story } from '../../models/cstory.model';
import { StoriesService } from '../../core/services/stories/stories.service';
import { Project } from '../../models/cproject.model';
import { ProjectsService } from '../../core/services/projects/projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  user !: User;
  errorGetUser: boolean=false;
  stories!: Story[];
  projects!: Project[];
  cantStoriesIsZero: boolean=false;
  errorGetStories: boolean=false;
  cantProjectsIsZero: boolean=false;
  errorGetProjects: boolean=false;

  constructor(private us:UserService, private ts: TokenStorageService, private ss: StoriesService, private ps: ProjectsService){}

  ngOnInit(): void {
    this.getUser();
    this.getStories();
    this.getProjects()
  }

  getUser(){
    this.us.getUser(this.ts.getUser()).subscribe(response =>{
      if(response.status == "success"){
        this.user = response.data        
      }else{
        this.errorGetUser = false;
      }
      
    })
    
  }

  getStories(){
    this.ss.getAllStories().subscribe(response => {
      if(response.status == "success"){
        console.log(response.data);
        this.stories = response.data;
        if(this.stories.length == 0){
          this.cantStoriesIsZero = true;
        }
      }else{
        this.errorGetStories = true;
      }
    })
  }

  
  getProjects() {
    this.ps.getProjectApi().subscribe(resp => {
      if (resp.status == "success") {
        this.projects = resp.data;
        this.errorGetProjects = false;
        if (this.projects.length == 0) {
          this.cantProjectsIsZero = true;
        } else {
          this.cantProjectsIsZero = false;
        }
      } else {
        this.errorGetProjects = true;
      }
    });
  }


}
