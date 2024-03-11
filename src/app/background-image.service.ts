import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundImageService {
  private classes: { [key: string]: string } = {
    '/main': 'background-home',
    '/login': 'background-auth',
    '/registration': 'background-auth',
  };

  getBackgroundClass(url: string): string {
    return this.classes[url] || 'default-background'; // Default class
  }
}
