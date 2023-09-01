import { Component, Input} from '@angular/core';
import { Story } from '../../models/cstory.model';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-story',
  templateUrl: './preview-story.component.html',
  styleUrls: ['./preview-story.component.scss']
})
export class PreviewStoryComponent{
  @Input() story!: Story;
  constructor(){}
}
