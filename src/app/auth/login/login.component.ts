import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  constructor(private authSevice: AuthService, private router: Router) { }

  responseData:any;
  alert:boolean = false;
  
  ngOnInit() {
    this.InitializeLoginForm();
  }

  InitializeLoginForm(){
    this.LoginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit(LoginForm: FormGroup){
    const LoginData = [LoginForm.value.email, LoginForm.value.password];

    console.log(LoginData);

    this.authSevice.LoginUser(LoginData)
    .subscribe(
      (response: Response) => {
        console.log(response);
        this.responseData = response;
        localStorage.setItem('access_token',this.responseData.success.token);
        localStorage.setItem('user_name',this.responseData.success.name);
        this.router.navigate(['']);
      }
    )
  }

}
