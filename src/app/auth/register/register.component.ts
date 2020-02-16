import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authSevice: AuthService, private router: Router) { }
  
  responseData:any;
  alert:boolean = false;

  ngOnInit() {
    this.InitializeRegisterForm();
  }

  InitializeRegisterForm(){
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      c_password: new FormControl('')
    })
  }

  onSubmit(registerForm: FormGroup){

    const SignUpdata = [
        registerForm.value.name,
        registerForm.value.email, 
        registerForm.value.password, 
        registerForm.value.c_password
      ];
    console.log(SignUpdata);
    
    // auth service
    this.authSevice.RegisterUser(SignUpdata)
      .subscribe((response: Response) =>{
        console.log(response);
        this.responseData = response;
        if(this.responseData.success.token){
          this.alert = true;
        }
        this.InitializeRegisterForm();
      },
      (error) => console.log(error) 
    );
  }

}
