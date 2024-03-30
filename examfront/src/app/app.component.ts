import { Component } from '@angular/core';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Touheed Portal';
  isVisibleNavBar:boolean = true;
  
  constructor(private questionService:QuestionService){}

  ngOnInit(){
    this.questionService.startQuizStatus.asObservable().subscribe((data)=>{
      this.isVisibleNavBar = data;
    })
  }
}
