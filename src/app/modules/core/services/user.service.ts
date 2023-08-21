import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';

import { GetUsersResponse, User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private  baseUrl: string = " https://lamansysfaketaskmanagerapi.onrender.com/api";

  constructor(private http: HttpClient, private tokenStorageService :TokenStorageService) {

  }
  
  getUsers(){
    return this.http.get<GetUsersResponse>(this.baseUrl+"/users",{ headers: {'auth': this.tokenStorageService.getToken()||""}})
    .pipe(map( resp =>{
      return resp.data.map( user => {
        return User.UserFromJson(user)
      })
    }
    ));
  }

}
