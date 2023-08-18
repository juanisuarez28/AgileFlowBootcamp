import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm! : FormGroup;
  hide = true;


  constructor(
    private formBuilder : FormBuilder,
  ) { 

  }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : new FormControl("",Validators.required),
      password : new FormControl("",Validators.required),
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log("Form is valid, form:", this.loginForm," close dialog");
      
    }else{
      
      console.log("this form is not valid");
    }
  }

  get passwordInput() { 
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



