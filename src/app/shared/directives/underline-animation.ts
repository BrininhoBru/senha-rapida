import { Directive, effect, ElementRef, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appUnderlineAnimation]',
  host: {
    'class': 'underline-animation',
    'style.position': 'relative'
  }
})
export class UnderlineAnimationDirective {
  @Input('appUnderlineHover') routeLink!: string;

  constructor(private el: ElementRef, private router: Router) {
    const routerEventsSignal = toSignal(
      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    );

    effect(() => {
      const currentUrl = this.router.url;
      if (currentUrl === this.routeLink) {
        this.el.nativeElement.classList.add('active-underline');
      } else {
        this.el.nativeElement.classList.remove('active-underline');
      }
    });
  }
}
