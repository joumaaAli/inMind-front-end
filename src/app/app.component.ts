import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BackgroundImageService } from './background-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavbar = true;

  constructor(
    private router: Router,
    private bgImageService: BackgroundImageService,
    private renderer: Renderer2
  ) {
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !(
          event.url.endsWith('/login') || event.url.endsWith('/registration')
        );
        this.updateBodyBackground(event.url);
      });
  }
  private updateBodyBackground(url: string): void {
    const backgroundClass = this.bgImageService.getBackgroundClass(url);
    this.renderer.setAttribute(document.body, 'class', backgroundClass);
  }
}
