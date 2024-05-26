import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  constructor(){}
  isLoadQuizComponentVisibleflag:boolean = true;
  isSliderComponentVisibleflag:boolean = true;
  isInstructionsComponentVisibleflag:boolean = false;
  isQuizStartComponentVisibleflag:boolean = false;
  currentCatId:any
  isExpand:boolean = false;

  ngOnInit(){}

  // getCId(cId:any)
  // {
  //   this.currentCatId = cId;
  // }

  currentCIdEvent(val:number)
  {
    this.currentCatId = val;
  }

  instructionComponentVisibleflag(val:boolean)
  {
    this.isInstructionsComponentVisibleflag = val;
    this.isLoadQuizComponentVisibleflag = !val;

  }

  loadQuizComponentVisibleflag(val:boolean)
  {
    this.instructionComponentVisibleflag(!val);
    this.isQuizStartComponentVisibleflag = !val
    this.isSliderComponentVisibleflag = val;
  }

  loadQuizStartComponentVisibleflag(val:boolean)
  {
    this.isQuizStartComponentVisibleflag = val;
    this.isInstructionsComponentVisibleflag = !val;
    this.isLoadQuizComponentVisibleflag = !val;
    this.isSliderComponentVisibleflag = false;
  }

  expandEvent(event:boolean){
    this.isExpand = event;
  }


}
