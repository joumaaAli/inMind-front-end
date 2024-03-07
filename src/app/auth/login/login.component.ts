import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Update the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response) => {
            this.authService.storeUserSession(response.user);
            this.router.navigate(['/dashboard']); // Adjust the route as necessary
          },
          (error) => {
            console.error('Login failed', error);
            // Implement additional error handling logic as needed
          }
        );
    }
  }
}
