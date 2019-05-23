 /*** Angular 7 ***/

// angular routing
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

// pass params in url 
// here pass slug or id in routerLink
<a class="btn btn-primary" [routerLink]="['/show',question.path]">Read More</a>   

// and then get that slug or id by importing ActivatedRoute Module in that components
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

//   show question service 
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

// Create Forms with ng Model

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

// In component import service
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


//   On click PublishQuestion - PublishQuestion function will call
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

//   here is the service
    createQuestion(publisQuestion){ //get data array
        return this.http.post(this.url,{
            title: publisQuestion[0],
            category_id: publisQuestion[1],
            body: publisQuestion[2],
          })
    }

}

// Edit Update Forms with ngModel

    <h2>Edit Question</h2>
        <form (ngSubmit)="PublishQuestion()"> // on submit button, PublishQuestion function will get call
          <div class="form-group">
            <label>Title:</label>
            <input type="text" class="form-control"  name="title" [(ngModel)]="title"  placeholder="Enter the title.."> //define ng model with name
          </div>
          <div class="form-group">
              <label>Category:</label>
            <select  class="custom-select mr-sm-2"  name="category" [(ngModel)]="category">  //define ng model with name
                <option *ngFor="let cat of categories" [ngValue]="cat.id">{{cat.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Body:</label>
            <angular-markdown-editor
              textareaId="editor1" rows="12"
              name="markdownText" [(ngModel)]="markdownText"  //define ng model with name
              [locale]="locale"
              [options]="editorOptions">
            </angular-markdown-editor>
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Publish">  //submit button
          </div>
      </form>


    // Submit and go back to previous page
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
   





