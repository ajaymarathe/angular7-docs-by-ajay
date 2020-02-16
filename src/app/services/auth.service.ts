import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../question';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  RegisterUser(userData){
    return this.http.post('http://api.bootcatch.com/api/register',{
      name: userData[0],
      email: userData[1],
      password: userData[2],
      c_password: userData[3],
    })
  }

  LoginUser(LoginData){
    return this.http.post('http://api.bootcatch.com/api/login',{
      email:LoginData[0],
      password:LoginData[1]
    });
  }

  GetBlogs():Observable<Question[]>{
    return this.http.get<Question[]>('http://api.bootcatch.com/api/question');
  }
}
