import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { data, error } from 'jquery';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private quizService:QuizService,private router:Router,private categoryService:CategoryService){}

  @Output() cIdEvent = new EventEmitter<number>();
  @Output() expandEvent = new EventEmitter<boolean>();

  isExpand:boolean = false;

  Categories:any = []
  ngOnInit(){
    this.categoryService.getCategories().subscribe((data)=>{
      this.Categories = data
      // console.log(this.Categories)
    },(error)=>{
      console.log(error)
    })
  }

  loadQuiz(val:any){
    localStorage.setItem('currentCatId',val);
    // subscribing forcefully for loading the load quiz component
    this.quizService.loadQuizStatus.next(true);

  }

  exapnd(){
    this.isExpand = !this.isExpand;
    this.expandEvent.emit(this.isExpand);
  }

}
