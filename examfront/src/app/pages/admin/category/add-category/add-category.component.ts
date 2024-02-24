import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { data, error } from 'jquery';

// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(private snack: MatSnackBar, private categoryService: CategoryService, private router: Router) { }
  
  @Input() currentCategoryId = true;
  @Input() isUpdateCategory = false;
  @Output() categoryComponentVisibleflag = new EventEmitter<boolean>();
  isDisbaled: boolean = false;
  isModify:boolean = false;
  // @ViewChild('myForm') myForm!: NgForm;
  category = {
    title: '',
    description: ''
  }

  ngOnInit() { 
    this.getQuizById();
  }

  getQuizById(){ 
    this.isModify = this.isUpdateCategory
    if(this.isUpdateCategory){
      console.log("jiii")
      this.categoryService.getCategoryById(this.currentCategoryId).subscribe((data:any)=>{
        this.category = data;
      },(_error)=>{

      })
    }
}

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null || this.category.description.trim() == '' || this.category.description == null) {
      this.snack.open("Filed are Required!!", "close", {
        duration: 3000
      })
      return;
    }
    // if (!this.isModify) {

      this.categoryService.addCategory(this.category).subscribe((data: any) => {
        // this.myForm.resetForm();
        this.category = data;
        console.log("Cat data ", this.category);
        if(!this.isModify){
          Swal.fire("Category is Created", "Category Id is " + data.cid, 'success')
        }else{
          Swal.fire("Category is Updated", "", 'success');
        }
        this.isDisbaled = true;
      }, (error) => {
        console.log(error)
        Swal.fire("Error", "", "error")
      }
      )
  //   }else{
  //     this.categoryService.updateCategory(this.category).subscribe((_data:any)=>{
  //       Swal.fire("Category is Updated", "", 'success');
  //     },(error)=>{
  //       console.log(error);
  //       Swal.fire("Error While Updating", "", "error");
  //     })
  //   }
  }

  update() {
    this.isDisbaled = !this.isDisbaled;
    this.isModify = true;
  }

  done() {
    // this.router.navigate(["/admin/categories"])
    this.categoryComponentVisibleflag.emit(true);
    this.isModify = false;  
  }
}
