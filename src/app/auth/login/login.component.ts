import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Update the path as needed
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
            this.authService.storeUserSession(response['Login']);
            this.router.navigate(['/main']).then(() => {
              Swal.fire({
                title: 'Success!',
                text: 'You have successfully logged in.',
                icon: 'success',
              });
            });
          },
          (error) => {
            console.error('Login failed', error);
          }
        );
    }
  }
}
