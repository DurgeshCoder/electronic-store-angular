import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ecom';
  constructor(private toastr: ToastrService) {}
  showToast() {
    this.toastr.error('Angular Ecommerce', 'This is success message', {
      closeButton: true,
    });
  }
}
