import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data, error, param } from 'jquery';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent {

  constructor(private activateRoute:ActivatedRoute,private quizService:QuizService){}
  @Output() currentCIdEvent = new EventEmitter<number>();
  @Output() instructionComponentVisibleflag = new EventEmitter<boolean>();
  currentCatId:any
  quizesData:any =[]
  spinner:boolean = true;
  ngOnInit(){
    this.getAllQuizes();
    
  
    this.quizService.loadQuizStatus.asObservable().subscribe((_data)=>{
      this.currentCatId = localStorage.getItem('currentCatId');
        this.currentCatId != 0?this.getQuizByCategory():this.getAllQuizes();
    })
  }
  getAllQuizes()
  {
    this.quizService.getAllActiveQuizes().subscribe((data)=>{
      this.quizesData = data;
      this.spinner = false;
    },(error)=>{

    })
  }
  
  getQuizByCategory()
  {
    this.quizService.getActiveQuizesByCategory(this.currentCatId).subscribe((data)=>{
      this.quizesData = data;
      this.spinner = false;
    },(error)=>{
      
    })
  }

  startInstruction(qId:number)
  {
    this.currentCIdEvent.emit(qId);
    this.instructionComponentVisibleflag.emit(true);
  }

}
