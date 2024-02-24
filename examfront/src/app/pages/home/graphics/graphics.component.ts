import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent {

  @Output() coloremit = new EventEmitter<any>();

  color = {
    navcolor: '',
    buttoncolor: ''
  }

  formcolorSubmit()
  {
    this.coloremit.emit(this.color);
  }

}
