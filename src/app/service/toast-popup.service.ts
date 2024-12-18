import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastPopupService {

  constructor() { }


  showToast(message: string, type: 'success' | 'error') {
    const toastContainer = document.getElementById('toastContainer');
    const toastTemplate = document.getElementById('toastTemplate')?.cloneNode(true) as HTMLElement;

    if (toastTemplate) {
      toastTemplate.style.display = 'block';
      toastTemplate.querySelector('.toast-body')!.textContent = message;

      toastTemplate.classList.remove('text-bg-primary', 'text-bg-success', 'text-bg-danger');
      if (type === 'success') {
        toastTemplate.classList.add('text-bg-success');
      } else {
        toastTemplate.classList.add('text-bg-danger');
      }

      toastTemplate.classList.add('slide-in');

      toastContainer?.appendChild(toastTemplate);
      const toast = new Toast(toastTemplate);
      toast.show();

      setTimeout(() => {
        toastTemplate.remove();
      }, 3000);
    }
  }
}
