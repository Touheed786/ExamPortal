import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, numberAttribute } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.scss']
})
export class QuizStartComponent {

  constructor(private questionService:QuestionService,private locationStrategy: LocationStrategy,private loginSrvice:LoginService){}
  @Input() currentCatId:any;
  @Output() loadQuizComponentVisibleflag = new EventEmitter<boolean>();
  questionData:any =[];
  marksGot:number = 0;
  correctedAnswer:number = 0;
  attempted:number = 0;
  finished:boolean = false;
  quizTitle =''
  currentUserId:number = 0;
  timer:any;
  val:any

  // Quizresult:any = {
  //   quiz:'',
  //   marksGot: 0,
  //   correctedAnswer: 0,
  //   attempted:0,
  //   numberOfQuestion:0,
  //   user:{
  //     id:0
  //   }
  // }

  ngOnInit(){
    this.getQuestion();
    this.preventBackButton();
    this.currentUserId = this.loginSrvice.getUser().id;
    console.log("User Id",this.currentUserId)
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event) {
    event.preventDefault();
  }

  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  getQuestion()
  {
    this.questionService.getQuestionNoOfByQuizId(this.currentCatId).subscribe((data:any)=>{
      this.questionData = data;
      console.log(this.questionData);
      this.timer = this.questionData.length * 2 * 60;
      this.startTimer();
    })
  }

  preventBackButton()
  {
    history.pushState(null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

 

  finishQuiz()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want Submit the Quiz!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      backdrop: `rgba(0,0,123,0.4)`
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizCalculation();
      }
    })
  }

  quizCalculation()
  {
    // call to question for Evaluate
    this.questionService.evalQuiz(this.questionData,this.currentUserId).subscribe((data:any)=>{
      console.log("data from back end",data)
      this.quizTitle = data.quizTitle;
      this.marksGot = data.marksGot;
      this.attempted = data.attempted;
      this.correctedAnswer = data.correctedAnswer;
    })

    this.finished = true;

  }
  
  homepage()
  {
    this.questionService.startQuizStatus.next(true);
    this.loadQuizComponentVisibleflag.emit(true);
  }

  startTimer()
  {
    const interval = setInterval(()=>{
      if(this.timer<=0)
      {
        this.quizCalculation();
        clearInterval(interval);
      }
      else{
        this.timer--;
      }
    },1000)
  }

  getFormatedTime()
  {
    let mm = Math.floor(this.timer/60);
    let sec = this.timer - mm * 60;
    return `${mm} min : ${sec} sec`
  }

  printResult()
  {
    window.print();
  }


}
