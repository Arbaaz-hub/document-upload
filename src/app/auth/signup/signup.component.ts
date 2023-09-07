import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;
  hidePassword = true; // Initially hide the password
  errorMessage: string = '';
  showError: boolean = false;

  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)] }),
    password: new FormControl('', { validators: [Validators.required] }),
    returnSecureToken: new FormControl(true)
  });

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  // This method is used for signup
  onSignup() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.signup(this.form.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/login']);
            this.toastr.success('Signup successfully!');
          },
          error: (err: string) => {
            this.showError = true
            this.errorMessage = err
          }
        })
    }
  }

  //Used to show and hide the password
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
