import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent {
  constructor(private quizService:QuizService,private categoryService:CategoryService) { }

  @Output() qIdEvent = new EventEmitter<number>();
  @Output() qIdforQuestion = new EventEmitter<number>();
  @Output() updateQuiz = new EventEmitter<boolean>();
  quizzes:any = []
  Categories:any = []
  selecteCategory ="All Categories"
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  fileSelected:boolean = true;
  selectedFiles: (File | null)[] = [];
  successMessages: string[] = Array(this.quizzes.length).fill('');

  ngOnInit() {
    this.getQuizzes();
    this.getCategories();

   }


   public getQuizzes()
   {
      this.quizService.getQuizzes().subscribe((data:any)=>{
        this.quizzes = data;

        console.log("quiz data",data)
      })
   }

   getCategories()
   {
    this.categoryService.getCategories().subscribe((data:any)=>{
      
      this.Categories = data;
      this.Categories['All Categories']
    })
   }

   delete(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You you want to Delete Quizz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(id).subscribe((data)=>{
          Swal.fire("Deleted Successfully", "", "success")
          this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qId != id)
          Swal.fire(
            'Deleted!',
            'Your Quizz has been deleted.',
            'success'
          )
        },(error) => {
          console.log(error)
          Swal.fire("Error", "Error to Deleting the Quizz", "error")
        })
      }
    })
   }

   update(qId:number){
    this.qIdEvent.emit(qId);
    this.updateQuiz.emit(true)
   }

   addNewQuiz(){
   }

   addAndViewQuestions(qId:any){
    this.qIdforQuestion.emit(qId);
   }

   sortQuiz(val:any)
   {
    if(val != 0)
    {
      this.quizService.getActiveQuizesByCategory(val).subscribe((data)=>{
        this.quizzes = data;
      })
    }
    else{
      this.getQuizzes();
    }
   }


   onFileSelected(event: Event,index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      // this.previewFile(this.selectedFile);
    }
    this.fileSelected =false;
    this.selectedFiles[index] = this.selectedFile;
    console.log(event)
  }

  importQuestion(index:number,qId:number){
    this.selectedFile = this.selectedFiles[index] ;
    if(this.selectedFile ){
      this.quizService.uploadQuestions(this.selectedFile,qId).subscribe((data:any)=>{
        console.log(data.body)
        this.successMessages[index] = data.body;
        this.removeFile(index);
      })
    }else{
      console.log("File is empty")
    }


  }

  // previewFile(file: File): void {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.previewUrl = reader.result;
  //   };
  // }

  removeFile(index:number): void {
    this.selectedFiles.splice(index,1);
  }
}
