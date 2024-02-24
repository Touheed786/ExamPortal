import { Component, EventEmitter, Input, Output } from '@angular/core';
import { error } from 'jquery';
import { QuestionService } from 'src/app/services/question.service';
import { QuizComponent } from '../quiz.component';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.scss']
})
export class ViewQuizQuestionComponent {
  constructor(private questionService:QuestionService,private quizService:QuizService){ }

  @Output() backToViewQuiz = new EventEmitter<boolean>();
  @Output() isAddQuestionComponentVisibleflag = new EventEmitter<boolean>();
  @Output() sendQIdToAddQuestionComponent = new EventEmitter<number>();
  @Output() quesIdEvent = new EventEmitter<number>();
  @Output() updateQuestion = new EventEmitter<boolean>();
  @Input() currentQuizId:any
  Questions:any = [];
  quizTitle=''
  ngOnInit(){
    this.getQuestion();
    this.getQuizId();
  }

  getQuestion()
  {
    this.questionService.getQuestionByQuizId(this.currentQuizId).subscribe((data:any)=>{
      console.log(data)
      this.Questions = data
    },(_error)=>{

    })
  }

  getQuizId()
  {
    this.quizService.getQuizById(this.currentQuizId).subscribe((data:any)=>{
      this.quizTitle = data.title;
    },(_error)=>{

    })
  }

  goBackToViewQuick(){
    this.backToViewQuiz.emit(true);
  }

  addQuestion()
  {
    this.isAddQuestionComponentVisibleflag.emit(true)
    this.sendQIdToAddQuestionComponent.emit(this.currentQuizId)
  }

  delete(quesId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You you want to Delete Question!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(quesId).subscribe((data) => {
          Swal.fire("Deleted Successfully", "", "success")
          this.Questions = this.Questions.filter((question: any) => question.quesId != quesId)
          Swal.fire(
            'Deleted!',
            'Your Question has been deleted.',
            'success'
          )
        }, (error) => {
          console.log(error)
          Swal.fire("Error", "Error in Deleting the Question", "error")
        })
      }
    })
  }

  update(quesId:any)
  {
    this.updateQuestion.emit(true);
    this.quesIdEvent.emit(quesId);
  }
}
