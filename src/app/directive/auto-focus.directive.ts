import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() autoFocus: boolean;

  constructor(private inputElement: ElementRef) { }

  ngAfterContentInit(): void {
    this.inputElement.nativeElement.focus();
  }

}
