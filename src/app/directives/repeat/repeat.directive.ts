// https://stackoverflow.com/a/44517329

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeat]'
})
export class RepeatDirective {
  constructor(private template: TemplateRef<any>, private container: ViewContainerRef) { }

  @Input() set repeat(count: number) {
    const container = this.container;
    container.clear();
    while (count--) container.createEmbeddedView(this.template);
  }
}
