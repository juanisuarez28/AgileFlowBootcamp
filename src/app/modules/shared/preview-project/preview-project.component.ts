import { Component, Input } from '@angular/core';
import { Project } from '../../models/cproject.model';

@Component({
  selector: 'app-preview-project',
  templateUrl: './preview-project.component.html',
  styleUrls: ['./preview-project.component.scss']
})
export class PreviewProjectComponent {
  @Input() project!: Project;

  
}
