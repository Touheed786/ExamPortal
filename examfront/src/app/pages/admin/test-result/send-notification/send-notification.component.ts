import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent {
  constructor(public modalRef: MdbModalRef<SendNotificationComponent>) {}
  @Input() testingData:any = "First"
  title: string | null = null;

  Notification ={
    title: '',
    description: ''
  }

  ngOnInit()
  {
    console.log("Inside Modal")
  }
  
  close()
  {
    this.modalRef.close();
  }
  formSubmit(){
    console.log(this.Notification)
    this.close();
  }
}
