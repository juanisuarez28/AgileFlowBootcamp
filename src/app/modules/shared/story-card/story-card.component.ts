import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../../models/cstory.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent {
  @Input() story!: Story;
  @Input() epicId!: string;
  @Input() projectId!: string | null;
  @Input() owner!: string | undefined;
  @Input() usuarios!: User[];
  @Output() editOutPut = new EventEmitter();
  @Output() deleteOutPut = new EventEmitter();

  updateStory() {
    console.log("editEvent");

    this.editOutPut.emit()
  }

  deleteStory() {
    console.log("deleteEvent");
    this.deleteOutPut.emit()

  }
}
