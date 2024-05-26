import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { ResultService } from 'src/app/services/result.service';
import { Subject, buffer } from 'rxjs';
import { error } from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery';
import * as XLSX from 'xlsx';
// declare var $ : any;

// declare var window:any;
@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements AfterViewInit,OnDestroy   {

  constructor(private resultService:ResultService,private renderer: Renderer2, private el: ElementRef){}
  
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


  ngAfterViewInit() {
    setTimeout(()=>{
    //   const data = document.querySelector(".dataTables_length");
    // const button = document.createElement("button");
    // button.innerText = "click Me"
    // button.className = "btn btn-primary"
    // data?.appendChild(button)
    // console.log(button)
    // button.addEventListener('click',()=>{
    //   console.log("Button is clicked")

     const commonButton = $('<a title="Export"><img src="../../../../assets/export.png"></a>')
      // .text('Common Button')
      // .addClass('exportExcell')
      // .addClass('btn-primary')
      .on('click', () => {
        this.exportToExcell();
      });

    const entriesContainer = $('.dataTables_length');

    commonButton.insertAfter(entriesContainer);

    commonButton.find('img').css({
      'height': '20px',
      'width': '20px',
      'margin': '4px',
      'cursor': 'pointer'
    });
    },200)

  }

  ngOnDestroy(): void {
  }

  exportToExcell(): void {
    const table = $('#DataTables_Table_0');
   
    const headerData: string[] = [];
    const tableData: string[][] = [];
    

    table.find('thead th').each(function() {
      headerData.push($(this).text());
    });
    
    // Iterate through each row in the table
    table.find('tbody tr').each(function() {
      const rowData: string[] = [];
      
      // Iterate through each cell in the row
      $(this).find('td').each(function() {
        rowData.push($(this).text());
      });
      
      tableData.push(rowData);
    });


     // Create a new workbook and add the data as a worksheet
     const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headerData, ...tableData]);
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
     // Generate a downloadable Excel file
     XLSX.writeFile(wb, 'table_data.xlsx');
  }
 

  getResults()
  {
    // return new Promise<void>((resolve, reject) => {
      this.resultService.getResults().subscribe((data:any)=>{
        this.Results = data;
        this.dtTrigger.next(null);
        console.log(this.Results);
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








