import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { ResultService } from 'src/app/services/result.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import * as $ from 'jquery';
// declare var $ : any;

declare var window:any

// declare var window:any;
@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent  {

  modalRef: MdbModalRef<SendNotificationComponent> | null = null;
  constructor(private resultService:ResultService,private dialog: MatDialog,private modalService: MdbModalService){}

  Results:any = [];
  resultViewModal:any;
  sortedData:any = []
  display = "none"; 
  formModal:any
  showModal = false;
  testingdata = "testinggggg..."

  // @ViewChild(MatSort) matSort: MatSort

  ngOnInit(){
    // this.resultViewModal = new window.bootstrap.Modal(
    //   document.getElementById('exampleModal')
    // )
    this.getResults()
    
  }

  openModal(userFirtstName:string) {
    this.modalRef = this.modalService.open(SendNotificationComponent,{
      modalClass: 'modal-dialog-centered modal-lg',
      ignoreBackdropClick: true,
      keyboard : false,
      data: { title: userFirtstName }
    })
  }

  getResults()
  {
    // return new Promise<void>((resolve, reject) => {
      this.resultService.getResults().subscribe((data:any)=>{
        this.Results = data;
        console.log(this.Results);
        this.sortData({active:'id', direction:'desc'});

        // resolve();
      },(error)=>{
        console.log(error)
        // reject(error)
      })
    // })
  }

//   getResults() {
//     this.getResultFromPromise()
//         .then(() => {
//           this.sortData({active:'marksGot', direction:'asc'});
//         })
//         .catch(e =>{

//         });
// }

  viewusermodal()
  {
    console.log("user click")
  }

  sortData(sort: Sort) {
    // console.log(sort)
    const data = this.Results.slice();
    if (!sort.active || sort.direction === '') {
      this.Results = data;
      return;
    }

    this.Results = data.sort((a:any, b:any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          console.log("id clicked")
          return compare(a.id, b.id, isAsc);
        case 'attempted':
          return compare(a.attempted, b.attempted, isAsc);
        case 'marksGot':
          return compare(a.marksGot, b.marksGot, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'quiz':
          return compare(a.quiz, b.quiz, isAsc);
        default:
          return 0;
      }
    });
  }

  // openModal() {
  //   this.display = "block";
  // }
  // onCloseHandled( 
  //   this.display = "none";
  // }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}







