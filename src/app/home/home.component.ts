import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Question } from '../question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  name: string;
  responseData;
  blogData:Question[];


  ngOnInit() {
    this.name = localStorage.getItem('user_name');
    this.GetBlog();
  }

  GetBlog(){
    this.authService.GetBlogs()
    .subscribe(question => this.blogData = question)
  }

}


// .subscribe(
//   (response: Response) =>{
//     console.log(response);
//     this.responseData = response;
//     this.blogData = this.responseData.data;
//   },
//   (error) => console.log(error)
// )