import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  constructor(){}

  
  // isAddQuizIconVisibleFlag = true
  isAddQuizComponentVisibleflag = false
  isViewQuizComponentVisibleflag = true
  isQuestionComponentVisibleflag:boolean = false
  isAddQuestionComponentVisibleflag:boolean = false

  currentQuizId:any;
  UpdateQuiz:boolean = false;
  UpdateQuestion:boolean = false;
  currentQuesId:any;


  ngOnInit(){}
  getCurrentQuizId(qId:number){
    this.currentQuizId = qId
    // this.isAddQuizIconVisibleFlag = false;
  }

  setUpdateQuiz(val:boolean)
  {
    this.UpdateQuiz = val;
    this.isViewQuizComponentVisibleflag = false;
    this.isAddQuizComponentVisibleflag = true;
  }

  quizzComponentVisibleflag(val:boolean)
  {
    this.isViewQuizComponentVisibleflag = val;
    this.isAddQuizComponentVisibleflag = !val;
  }

  addQuizz()
  {
    this.isViewQuizComponentVisibleflag = false;
    this.isAddQuizComponentVisibleflag = true;
    this.UpdateQuiz = false;
  }

  geQuizIdforQuestion(qId:any){
    this.currentQuizId = qId;
    this.isQuestionComponentVisibleflag =  true;
    this.isViewQuizComponentVisibleflag = false;
    this.isAddQuizComponentVisibleflag = false;
    // this.isAddQuizIconVisibleFlag = false;
  }

  backToViewQuiz(val:boolean)
  {
    this.isViewQuizComponentVisibleflag = val;
    this.isQuestionComponentVisibleflag =  !val;
    // this.isAddQuizIconVisibleFlag = val;
  }

  setAddQuestionComponentVisibleflag(val:any)
  {
    this.isAddQuestionComponentVisibleflag = val;
    this.isQuestionComponentVisibleflag =  !val;
    this.isViewQuizComponentVisibleflag = !val;
    this.isAddQuizComponentVisibleflag = !val;
    // this.isAddQuizIconVisibleFlag = !val;
  }

  sendQIdToAddQuestionComponent(qId:number)
  {
    this.currentQuizId = qId;
  }

  backToQuestionComponentVisibleflag(val:boolean)
  {
    this.isAddQuestionComponentVisibleflag = !val;
    this.isQuestionComponentVisibleflag =  val;
    this.isViewQuizComponentVisibleflag = !val;
    this.isAddQuizComponentVisibleflag = !val;
    this.UpdateQuestion = !val;
    // this.isAddQuizIconVisibleFlag = !val;
  }

  setUpdateQuestion(val:any)
  {
    this.UpdateQuestion = val;
  }

  getCurrentQuestionId(val:number)
  {
    this.currentQuesId = val;
    this.isAddQuestionComponentVisibleflag = true;
    this.isQuestionComponentVisibleflag =  false;
    this.isViewQuizComponentVisibleflag = false;
  }
}

