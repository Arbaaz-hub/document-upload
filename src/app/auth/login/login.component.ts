import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  hidePassword = true; // Initially hide the password
  errorMessage: string = '';
  showError: boolean = false;
  
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)] }),
    password: new FormControl('', { validators: [Validators.required] }),
    returnSecureToken: new FormControl(true)
  });

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  // This method is used for login.
  onLogin() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe({
          next: (resData) => { this.toastr.success('Logged in successfully!') }
          , error: (err: any) => {
            this.showError = true
            this.errorMessage = err
          }
        });
    }
  }

  //Used to show and hide the password
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
