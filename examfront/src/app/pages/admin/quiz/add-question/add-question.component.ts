import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'jquery';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {

  public Editor = ClassicEditor;

  constructor(private questionService:QuestionService,private snack: MatSnackBar){}

  @Output() QuestionComponentVisibleflag = new EventEmitter<boolean>();
  @Input() currentQuizId:any;
  @Input() currentQuesId:any;
  @Input() isUpdateQuestion = false;
  Quizz = []
  isDisbaled:boolean = false
  isModify:boolean = false;

  QuestionData = {
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz:{
      title:''
    }
  }

  ngOnInit(){
    this.getQuizById();
    this.getQuestionById();

  }

  getQuizById()
  {
    this.questionService.getQuizById(this.currentQuizId).subscribe((data:any)=>{
      this.QuestionData.quiz = data;
      this.isModify = this.isUpdateQuestion;
    },(_error)=>{

  })
  }

  getQuestionById()
  {
    // if(this.isUpdateQuestion ){
    if(this.isUpdateQuestion ){
      console.log("old value",this.isUpdateQuestion)
      this.questionService.getQuestionById(this.currentQuesId).subscribe((data:any)=>{
        this.QuestionData = data;
      },(error)=>{

      })
    }
  }

  formSubmit(){
    if (this.QuestionData.content.trim() == '' || this.QuestionData.content == null) {
      this.snack.open("Fileds are Required!!", "close", {
        duration: 3000
      })
      return;
    }
    if (this.QuestionData.option1.trim() == '' || this.QuestionData.option1 == null) {
      this.snack.open("Fileds are Required!!", "close", {
        duration: 3000
      })
      return;
    }
    if (this.QuestionData.option2.trim() == '' || this.QuestionData.option2 == null) {
      this.snack.open("Fileds are Required!!", "close", {
        duration: 3000
      })
      return;
    }
    if (this.QuestionData.answer.trim() == '' || this.QuestionData.answer == null) {
      this.snack.open("Fileds are Required!!", "close", {
        duration: 3000
      })
      return;
    }
    this.questionService.addQuestion(this.QuestionData).subscribe((data:any)=>{
      this.QuestionData = data;
      console.log("question",data)
      if(!this.isModify){
        Swal.fire("Question is Created", "Question Id is " + data.quesId, 'success')
      }else{
        Swal.fire("Question is Updated", "", 'success');
      }
      this.isDisbaled = true;
    }, (error) => {
      console.log(error)
      Swal.fire("Error", "", "error")
    })

  }

  done()
  {
    this.QuestionComponentVisibleflag.emit(true);
    this.isModify = false;  
  }

  update()
  {
    this.isDisbaled = !this.isDisbaled;
    this.isModify = true;
  }

}
