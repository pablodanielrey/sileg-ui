import { Directive, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Directive({
  selector: '[appToogleFullscreen]'
})
export class ToogleFullscreenDirective {

  constructor() { }

  @HostListener('click') onClick() {
		if (screenfull.enabled) {
			screenfull.toggle();
		}
	}

}
