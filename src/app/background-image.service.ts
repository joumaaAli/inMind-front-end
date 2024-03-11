import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageService {
  private classes: { [key: string]: string } = {
    '/main': 'background-home',
    '/login': 'background-auth',
    '/registration': 'background-auth',
    '/country/:id': 'background-details',
  };

  getBackgroundClass(url: string): string {
    if (url.match(/\/country\/.+/)) {
      return 'background-details';
    }
    return this.classes[url] || 'default-background'; // Default class
  }
}
