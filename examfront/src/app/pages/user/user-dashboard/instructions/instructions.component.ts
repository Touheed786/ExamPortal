import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  constructor(private questionService: QuestionService) { }
  @Output() loadQuizComponentVisibleflag = new EventEmitter<boolean>();
  @Output() loadQuizStartComponentVisibleflag = new EventEmitter<boolean>();
  @Input() currentCatId: any;
  quizzData: any = []
  spinner: boolean = true;
  noOfQuestion: number = 0;
  ngOnInit() {
    this.getQuizById();
    this.getQuestionNoOfByQuizId();
  }

  getQuizById() {
    this.questionService.getQuizById(this.currentCatId).subscribe((data) => {
      console.log(data)
      this.quizzData = data;
    }, (error) => {
      alert("Error In Loading Quiz Data")
    })
  }

  getQuestionNoOfByQuizId() {
    this.questionService.getQuestionNoOfByQuizId(this.currentCatId).subscribe((data: any) => {
      this.noOfQuestion = data.length;
      console.log("length", this.noOfQuestion)

    }, (error) => {
      alert("Error In Loading Questions")
    })
  }

  goBackToViewQuick() {
    this.loadQuizComponentVisibleflag.emit(true);
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to proceed with this Quiz!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      backdrop: `rgba(0,0,123,0.4)`
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadQuizStartComponentVisibleflag.emit(true);
        this.questionService.startQuizStatus.next(false);
      }
    })
  }

}
