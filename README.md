# Angular7 Docs by Ajay
Hi there, this is angular docs by me.

### App.Module.ts
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //import HttpClientModule module, if you are going to work on services usign http.
import { FormsModule } from '@angular/forms'; // import FormsModule module, if you are going to work on NgModel.

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { ShowQuestionComponent } from './show-question/show-question.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CreateQuestionComponent } from './create-question/create-question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    LoginComponent,
    ShowQuestionComponent,
    SignUpComponent,
    NavbarComponent,
    FooterComponent,
    CreateQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // define your modules here
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


### Angular routing 
```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; //import these
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowQuestionComponent } from './show-question/show-question.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'show/:id', component: ShowQuestionComponent }, //pass id in route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// then in app.module.ts import this line 
import { AppRoutingModule } from './app-routing.module';

imports:[
     AppRoutingModule, 
]
```

### Then add this - ```<router-outlet></router-outlet>``` in main html file
```
<router-outlet></router-outlet>
```

- Pass params in url 
- Here pass slug or id in routerLink
```
<a class="btn btn-primary" [routerLink]="['/show',question.path]">Read More</a>   
```

- And then get that slug or id by importing ActivatedRoute Module in that components
```
import {ActivatedRoute} from '@angular/router';
// then defined in constructor like this
constructor(private route: ActivatedRoute) { }

//get slug or id in function 

getSingleQuestion(){
    const slug = this.route.snapshot.params.id; // get the slug
    console.log(slug);
    this.showquestion.SingleQuestion(slug) //pass the slug to the service, so you can get your question by slug.
    .subscribe(
      (response: Response) => { //here you will get response
        this.singleQuestion =  Object.keys(response).map((keys) => response[keys]) // map the response data into single Question
        console.log(response);
      },
      (error) => console.log(error) //console the error
    );
  }
```

## Show question service 
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //to make http call you will need this HttpClient module.

@Injectable({
  providedIn: 'root'
})
export class ShowquestionService {

  constructor(private http: HttpClient) { } //then define httpClient as http

  SingleQuestion(slug){
    return this.http.get('http://localhost:8000/api/'+slug); // and here make http request
  }
}
```

## Create Forms with ng Model
```
<h2>Ask Question</h2>
<form (ngSubmit)="PublishQuestion()"> //on click ngSubmit get all data.
  <div class="form-group">
    <label>Title:</label>
    <input type="text" class="form-control"  name="title" [(ngModel)]="title"  placeholder="Enter the title..">// define ngModel with name property
  </div>
  <div class="form-group">
    <select  class="custom-select mr-sm-2"  name="category" [(ngModel)]="category">// define ngModel with name property
        <option *ngFor="let cat of categories" [ngValue]="cat.id">{{cat.name}}</option>
    </select>
  </div>
  <div class="form-group">
    <angular-markdown-editor
      textareaId="editor1" rows="12"
      name="markdownText" [(ngModel)]="markdownText" // define ngModel with name property
      [locale]="locale"
      [options]="editorOptions">
    </angular-markdown-editor>
  </div>
  <div class="form-group">
    <input type="submit" class="btn btn-primary" value="Publish">  //type should be submit
  </div>
</form>
```

#### In component import service
```
import { Component, OnInit } from '@angular/core';
import { CreateQuestionService } from '../create-question.service'; //import service

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  //define the  variables
  title;
  category;
  markdownText;

  categories;
  responseData;

  constructor(private createquestionservice: CreateQuestionService) { } //define the constructor
  url = 'http://localhost:8000/api/question'; //url route here

  //on page refresh ngOnInit will call
  ngOnInit() {
  }
```

#### On click PublishQuestion - PublishQuestion function will call
```
  PublishQuestion(){
    const publisQuestion = [this.title, this.category, this.markdownText]; // get data in array
    console.log(publisQuestion); //check that are you getting the actual data.

    this.createquestionservice.createQuestion(publisQuestion) //pass the data array in service
    .subscribe(
      (response: Response) => { //get response
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
 ```

#### here is the service
```
    createQuestion(publisQuestion){ //get data array
        return this.http.post(this.url,{
            title: publisQuestion[0],
            category_id: publisQuestion[1],
            body: publisQuestion[2],
          })
    }
}
```


### Add bootstrap in angular project
```
- npm i bootstrap // install all these three commands
- npm i jquery 
- npm i popper.js 

// import bootstrap.min.css in Style.scss
"styles": [
    "src/styles.scss",
    "./node_modules/font-awesome/css/font-awesome.min.css",
  ],

// import other script dependency
"scripts": [
    "./node_modules/jquery/dist/jquery.min.js",  
    "./node_modules/popper.js/dist/umd/popper.min.js",  
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
],
```

### Edit & update with ngModel
```
  <h1>Edit Post</h1>
  <form (ngSubmit)="EditPost()" *ngIf="editPost"> // on click update button, EditPost function will get call
    <div class="form-group">
      <mat-form-field>
        <input type="text" [(ngModel)]="editPost.title"  name="title" class="form-control shadow-none" matInput placeholder="Title"> //define ngModel with name property
      </mat-form-field>
    </div>
    <div class="form-group">
      <mat-form-field>
        <mat-select placeholder="Select"  name="category" [(ngModel)]="editPost.category" name="category"> //define ngModel with name property
          <mat-option *ngFor="let category of categories_data" [value]="editPost.category">{{ category.category }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div class="form-group">
      <ckeditor [editor]="Editor" name="body" [(ngModel)]="editPost.body"></ckeditor> //define ngModel with name property
    </div>
    <div class="form-group">
        // update button
      <button type="submit" class="btn btn-primary">Update</button> 
    </div>
  </form>
 ```

#### EditPost component
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // import ActivatedRoute and Router
import { PostService } from '../post.service'; // import the service
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor(private route: ActivatedRoute, private postservice: PostService, private router: Router) { } //inject ActivatedRoute, service and Router
  editPost;
  categories_data;

  ngOnInit() {
    this.getPost();
    this.GetCategories();
  }

  EditPost(){
    const slug = this.route.snapshot.params.id; //slug
    console.log(slug);
    const editPostData =[this.editPost]; // make editPost array
    console.log(editPostData[0].body); // check the editPostData

    this.postservice.UpdatePost(editPostData,slug) //pass the slug ad editPostData
    .subscribe(
      (response: Response) =>{
        console.log(response);
      },
      (error) =>{ 
        console.log(error);
        this.router.navigate(['']); //after updating the post, redirect it to home
      }
    );
  }

  getPost(){
    const slug = this.route.snapshot.params.id; //get the slug
    console.log(slug);

    this.postservice.ShowPost(slug) //pass the slug
    .subscribe(
      (response: Response) =>{
        this.editPost = response; //store the response in editPost
        console.log(response)
      },
      (error) => console.log(error)
    );
  }

  GetCategories(){ // get categories
    this.postservice.Catgories()
    .subscribe(
      (response: Response) => {
        this.categories_data = Object.keys(response).map((keys) => response[keys]) // map the response
        // console.log(response);
      }
    );
  }

}
```

#### Update post service
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //import HttpClient

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8000/api/"; // api route

  // update posts
  UpdatePost(editPostData,slug){
    // console.log('first',editPostData);
    // console.log(slug);
    return this.http.patch(this.url+'posts/'+slug,{ //patch request
      title: editPostData[0].title,
      slug: editPostData[0].title, 
      category: editPostData[0].slug,
      body: editPostData[0].body
    });
  }

}
```

## Authentication using Angular 
```
#### Login component
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authentication_service: AuthenticationService) { }

  email;
  password;

  responseData;

  ngOnInit() {
  }
  
  LoginUser(){
    const loginData = [this.email, this.password]; //collect the data in array
    console.log(loginData);

    this.authentication_service.LogUser(loginData) // pass the data to LogUser service
    .subscribe(
      (response: Response) =>{
        console.log(response);
        this.responseData = response;
        localStorage.setItem('access_token', this.responseData.access_token) //set the access_token in LocalStorage
      }
    );
  }

}
```

#### Singup Component
```
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'; // import the service
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authentication_service: AuthenticationService) { } // inject the service

  name;
  email;
  password;

  response_data;

  ngOnInit() {
  }

  SignUpUser(){
    const SignupData = [this.name, this.email, this.password]; // collect the data in array
    console.log(SignupData);
    this.authentication_service.SignUp(SignupData) // pass the data to service
    .subscribe(
      (response: Response) => {
        console.log(response)
        this.response_data = response;
        localStorage.setItem("access_token", this.response_data.access_token); // set the access_token
      },
      (error) => console.log(error)
    );
  }

}
```


#### Authentication service 
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // import the httpClient 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { } // inject it in constructor

  // sigup the user
  SignUp(SignupData){
    return this.http.post("http://127.0.0.1:8000/api/auth/signup",{
      name: SignupData[0],
      email: SignupData[1],
      password: SignupData[2]
    });
  }

  // Log the user 
  LogUser(loginData){
    return this.http.post("http://127.0.0.1:8000/api/auth/login",{
      email: loginData[0],
      password: loginData[1]
    });
  }
}
```

## Router
- Get Current route
```
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // import router from angular/router


@Component({
  selector: 'base-nav',
  templateUrl: './base-nav.component.html',
  styleUrls: ['./base-nav.component.scss']
})
export class BaseNavComponent implements OnInit {

  constructor(private router: Router) { } //inject here

  ngOnInit() {
    console.log(this.router.url); // And you will get current route here.
  }

}
```

### Go 2 step back
```
window.history.go(-2); // <- pass the value that you want to go back.
```

### Submit and go back to previous page
```
import { Location } from '@angular/common'; //import location in component'

constructor(private location: Location) { } // inject location into class constructor

cancel() { //on click cancel, it will go back previous page.
    this.location.back(); // <-- go back to previous location on cancel
}

// Redirect with router
import { Router } from "@angular/router"; //import router from angular/router

constructor(private router: Router) { } // inject router in constructor

redirect(){ //onclick redirect function it will get redirect to given path
    this.router.navigate(['']);
}
```

### Render data as json
```
{{ responseData | json }} // <- use this json pipe.
```

### Create Pipe in Angular
```
ng generate p [name] // <- Create pipe

// Here are the example - I have created limitTo pipe

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: string, args: string) : string {
    let limit = args ? parseInt(args, 10) : 10;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}

// also register in app.module.ts
import { LimitToPipe } from './limit-to.pipe';

@NgModule({
  declarations: [
    LimitToPipe,
  ]
      
  })
```

