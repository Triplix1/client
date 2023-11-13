import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  setupPopstateListener(callback: () => void): void {
    window.addEventListener('popstate', () => {
      // Execute the provided callback when the user navigates using browser navigation buttons
      callback();
    });
  }

  reloadPage(): void {
    // Reload the page
    window.location.reload();
  }
}
