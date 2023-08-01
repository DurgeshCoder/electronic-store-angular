import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/models/loginresponse.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  formSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.loginData);
    // VALIDATE
    if (
      this.loginData.email.trim() === '' ||
      this.loginData.password.trim() === ''
    ) {
      this.toastr.error('Values Required !!');
      return;
    }

    //login api
    this.authService.generateToken(this.loginData).subscribe({
      next: (value: LoginResponse) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
