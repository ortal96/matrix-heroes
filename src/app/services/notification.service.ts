import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public error(message: string): void {
    Swal.fire({ icon: 'error', title: message });
  }
}
