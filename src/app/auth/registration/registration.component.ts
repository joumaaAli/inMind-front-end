import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        isAdmin: [false],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(fg: FormGroup): { [key: string]: boolean } | null {
    const passwordControl = fg.get('password');
    const confirmPasswordControl = fg.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    return passwordControl.value === confirmPasswordControl.value
      ? null
      : { notmatched: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = { ...this.registrationForm.value };
      if (formValue.isAdmin) {
        formValue.role = 'Admin';
      }
      delete formValue.confirmPassword;
      this.authService.registerUser(formValue).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.loginUser(
            response.username,
            this.registrationForm.value.password
          );
        },
        (error) => {
          console.error('Registration failed', error);
        }
      );
    }
  }

  private loginUser(username: string, password: string) {
    this.authService.loginUser(username, password).subscribe(
      (response) => {
        this.authService.storeUserSession(response['Login']);
        this.router.navigate(['/main']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
