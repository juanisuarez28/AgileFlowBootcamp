import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-proyect-card',
  templateUrl: './proyect-card.component.html',
  styleUrls: ['./proyect-card.component.scss']
})
export class ProyectCardComponent {
  @Input() title='';
  @Input() description='';
  @Input() members='';

}
