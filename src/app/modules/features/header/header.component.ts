import { TokenStorageService } from '../../auth/token-storage.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Output() toggle = new EventEmitter();
  rutaActual :string ="";
  firstLevelRoute : boolean=false;


  logout(){
    this.tokenService.signOut();
    console.log(this.tokenService.getToken());
    
  }
  constructor(private headerService: HeaderService, private router: Router,private tokenService : TokenStorageService ){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.headerService.getRutaActual$().subscribe( resp=>{
      this.rutaActual = resp;
    })
    this.headerService.getFirstLevelRoute$().subscribe( resp=>{
      this.firstLevelRoute = resp;
    })
  }
  
  toggleNavBar(){
    this.toggle.emit();
  }
  previousLevel(){
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/').filter(segment => segment !== ''); // Remove empty segments

    if (urlSegments.length > 1) {
      urlSegments.pop(); // Remove the last element
      const newUrl = `/${urlSegments.join('/')}`;

      this.router.navigateByUrl(newUrl);
    } else {
      // Handle if there's only one segment or no segment left
      console.log('Cannot go back further');
    }
  }
  

}
