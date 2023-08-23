import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter();
  @Input() rutaActual :string ="";

  constructor(private tokenService : TokenStorageService){}

  toggleNavBar(){
    this.toggle.emit();
  }

  logout(){
    this.tokenService.signOut();
    console.log(this.tokenService.getToken());
    
  }
}
