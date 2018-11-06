import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import { MDCTextField} from '@material/textfield/index';
import {Group} from '../Model';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements AfterViewInit {

  private elements = [];
  @Input() group: Group;

  constructor(private myElement: ElementRef) { }

  ngAfterViewInit() {
    this.elements = Array.from(this.myElement.nativeElement.querySelectorAll('.mdc-text-field')).map((ele) => new MDCTextField(ele));
  }

}
