import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data, error } from 'jquery';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.scss']
})
export class AddQuizzComponent {
  selectedCategory:any;
  constructor(private categoryService: CategoryService, private snack: MatSnackBar, private quizService: QuizService,private router:Router) { }

  @Input() currentQuizId = true;
  @Input() isUpdateQuiz = false;
  @Output() quizzComponentVisibleflag = new EventEmitter<boolean>();

  @ViewChild('myForm') myForm!: NgForm;
  isDisbaled: boolean = false;
  isModify:boolean = false;
  Categories:any = [];

  quizzData = {
    title: '',
    description: '',
    maxMArks: '',
    numberOfQuestions: '',
    active: true,
    category:{
      cid:'',
      title:''
    }
  }

  ngOnInit() {
    this.getQuizById();
    this.Initialize();
  }

  Initialize() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.Categories = data;
      console.log("ab")
      this.isModify = this.isUpdateQuiz
    },
      (error) => {
        console.log(error)
        Swal.fire("Error", "Error in Loading data from server", "error")
      })
  }

  getQuizById(){ 
        if(this.isUpdateQuiz){
          console.log("nill")
          this.quizService.getQuizById(this.currentQuizId).subscribe((data:any)=>{
            this.quizzData = data;
            this.quizzData.category = data.category;
            console.log(this.quizzData.category)
          },(_error)=>{
    
          })
        }
  }



  formSubmit() {
    if (this.quizzData.title.trim() == '' || this.quizzData.title == null || this.quizzData.description.trim() == '' || this.quizzData.description == null) {
      this.snack.open("Fileds are Required!!", "close", {
        duration: 3000
      })
      return;
    }
    this.selectedCategory = this.quizzData.category;
    this.quizService.addQuiz(this.quizzData).subscribe((data: any) => {
      this.quizzData = data;
      this.quizzData.category = this.selectedCategory;
      if(!this.isModify){
        Swal.fire("Quiz is Created", "Quiz Id is " + data.qId, 'success')
      }else{
        Swal.fire("Quiz is Updated", "", 'success');
      }
      this.isDisbaled = true;
    }, (error) => {
      console.log(error)
      Swal.fire("Error", "", "error")
    })
  }

  done(){
    // this.myForm.resetForm();
    // this.router.navigate(["/admin/quizzes"])
    this.quizzComponentVisibleflag.emit(true);
    this.isModify = false;  
    
  }

  update(){
    this.isDisbaled = !this.isDisbaled;
    this.isModify = true;
  }

}
