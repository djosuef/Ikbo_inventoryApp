import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showError(message: string) {
    alert(message); // Simple alert for error messages
  }

  showSuccess(message: string) {
    alert(message); // Simple alert for success messages
  }
}