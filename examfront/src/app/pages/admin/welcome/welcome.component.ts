import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResultService } from 'src/app/services/result.service';


  @Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
  })
export class WelcomeComponent {
  constructor(private resultService:ResultService,private dialog: MatDialog){}
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  Results:any = [];
  dialogRef:any

  ngOnInit(){
    this.getResults()
    
  }

  getResults()
  {
    this.resultService.getResults().subscribe((data:any)=>{
      this.Results = data;
      console.log(this.Results);
    },(error)=>{
      console.log(error)
    })
  }
 

  

    callAPI() {
        this.dialogRef = this.dialog.open(this.callAPIDialog,{
          disableClose: true,
          height:'50%',
          width:'60%',
        });
        // dialogRef.afterClosed().subscribe(result => {
        //     // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        //     if (result !== undefined) {
        //         if (result === 'yes') {
        //             // TODO: Replace the following line with your code.
        //             console.log('User clicked yes.');
        //         } else if (result === 'no') {
        //             // TODO: Replace the following line with your code.
        //             console.log('User clicked no.');
        //         }
        //     }
        // })

      }

      sendData()
      {
        // this.dialogRef.close();
      }
}
