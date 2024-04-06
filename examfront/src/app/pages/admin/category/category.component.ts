import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  constructor(){}

  currentCategoryId:any;
  isComponentVisibleflag = true
  isViewCategoryComponentVisibleflag = true
  isAddCategoryComponentVisibleflag = false
  UpdateCategory:boolean = false;

  ngOnInit(){}

  addCategory(){
    this.isViewCategoryComponentVisibleflag = false;
    this.isAddCategoryComponentVisibleflag = true;
    this.isComponentVisibleflag = false;
    this.UpdateCategory = false;
  }

  getCurrentCategoryId(qId:number){
    this.currentCategoryId = qId
    this.isComponentVisibleflag = false;
    this.isViewCategoryComponentVisibleflag = false;
    this.isAddCategoryComponentVisibleflag = true
  }

  setUpdateCategory(val:boolean)
  {
    this.UpdateCategory = val;
  }

  categoryComponentVisibleflag(val:boolean)
  {
    this.isViewCategoryComponentVisibleflag = val;
    this.isAddCategoryComponentVisibleflag = !val;
    this.isComponentVisibleflag = val;
  }
}
