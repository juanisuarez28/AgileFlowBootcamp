import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../api-rest/services/auth.service';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm! : FormGroup;
  hide = true;
  respuesta: any;
  wrongLogin =false;

  constructor(  private formBuilder : FormBuilder, 
                private authService: AuthService, 
                private tokenService : TokenStorageService,
                private router : Router,
                ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : new FormControl("",Validators.minLength(4)),
      password : new FormControl("",Validators.minLength(4)),
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log("Form is valid, form:", this.loginForm);
      this.authService.postLogin(this.loginForm.value).subscribe(
        (response)=>{
          this.respuesta = response; 
          console.log(this.respuesta.success);
          
          if(this.respuesta.success){
            this.tokenService.saveToken(this.respuesta.token);//guarda el token
            this.tokenService.saveUser(this.respuesta.user._id);//guarda id del user
            console.log(this.respuesta.token);
            this.router.navigateByUrl('/');
           }else{
              console.log("Usuario no autorizado/registrado");
              this.wrongLogin = true;
           }
        }
     ); 
    }else{
      
      console.log("this form is not valid");
    }
  }

  getpasswordInput() { 
    return this.loginForm.get('password');
  }  

}

export interface epicaForm {
  project: string;
  name: string;
  description: string;
  icon: string;
  option: string
}

export interface User{
  username: string;
  password: string;
}



