import { NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'genex-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class GenexInputComponent implements OnInit, OnChanges {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() form: FormGroup | null = null;
  @Input() controlName = '';
  @Input() autocomplete = 'on';
  @Input() maxlength: number | null = null;
  @Input() dataType: 'text' | 'number' | 'date' | 'email' | 'password' | 'tel' =
    'text';

  public isDisabled = false;

  ngOnInit(): void {
    // Check if form is provided
    if (!this.form) {
      throw new Error('No form provided');
    }
    // Check if control name is provided
    if (!this.controlName) {
      throw new Error('No control name provided');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      this.isDisabled = this.form?.get(this.controlName)?.disabled ?? false;
    }
  }
}
