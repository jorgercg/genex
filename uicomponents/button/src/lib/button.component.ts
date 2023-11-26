import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'genex-button',
  imports: [NgIf],
  standalone: true,
  templateUrl: './button.component.html',
})
export class GenexButtonComponent {
  @Input() label = '';
  @Input() isDisabled = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  @ViewChild('genexbtn') genexbtn?: ElementRef;

  clickEvent() {
    this.genexbtn?.nativeElement.blur();
    this.clicked.emit();
  }
}
