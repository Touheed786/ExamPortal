import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { ResultService } from 'src/app/services/result.service';
import { Subject } from 'rxjs';
import { error } from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var $: any;
// declare var $ : any;

// declare var window:any;
@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent  {

  constructor(private resultService:ResultService){}
  
  public Editor = ClassicEditor;
  Results:any = [];
  testingdata = "testinggggg..."
  dtOptions:DataTables.Settings = {}
  dtTrigger:Subject<any> = new Subject<any>();
  ResultData:any
  userName:string ="";
  Description = {
    content:"",
    email:""
  }


  ngOnInit(){
    
    this.dtOptions = {
      pagingType : "full_numbers",
      order : [0, 'desc']
    };
    this.getResults();
    
  }

 

  getResults()
  {
    // return new Promise<void>((resolve, reject) => {
      this.resultService.getResults().subscribe((data:any)=>{
        this.Results = data;
        console.log(this.Results);

        this.dtTrigger.next(null);

        // resolve();
      },(error)=>{
        console.log(error)
        // reject(error)
      })
    // })
  }

  getResultById(id:number){
    this.Description.content = ""
    this.resultService.getResultByResult(id).subscribe((data)=>{
      this.ResultData = data;
      this.userName = this.ResultData.user.firstName + " "+this.ResultData.user.lastName;
      console.log(this.ResultData.user.username)
      console.log("Working Fine")
    },(err)=>{
      console.log(err)
    })
  }

}








