import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLandingPage: boolean = false;
  routerEvents: any;

  constructor(private router: Router, private elRef: ElementRef) {}

  ngOnInit() {
    const hostElement = this.elRef.nativeElement;

    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          window.scrollTo(0, 0);
          hostElement.style.background = 'none';
        } else {
          setTimeout(() => {
            hostElement.style.backgroundColor = 'rgba(11, 13, 19, 0.85)';
          }, 1000);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }
}
