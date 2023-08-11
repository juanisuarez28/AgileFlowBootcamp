import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter();
  @Input() rutaActual :string ="";

  toggleNavBar(){
    this.toggle.emit();
  }
}
