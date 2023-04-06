import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router, private elRef: ElementRef) {}

  hostElement = this.elRef.nativeElement;

  actualYear: number = new Date().getFullYear();
  routerEvents: any;

  ngOnInit(): void {
    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          window.scrollTo(0, 0);
          this.hostElement.style.visibility = 'hidden';
          this.hostElement.style.background = 'none';
        } else {
          this.hostElement.style.visibility = 'visible';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }
}
