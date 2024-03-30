import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { ResultService } from 'src/app/services/result.service';
import { Subject } from 'rxjs';
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

  Results:any = [];
  testingdata = "testinggggg..."
  dtOptions:DataTables.Settings = {}
  dtTrigger:Subject<any> = new Subject<any>();


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

}








