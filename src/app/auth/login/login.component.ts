import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  loginForm!: FormGroup;
  submitTry: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    window.scrollTo(0, 0);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.submitTry = false;
      this.auth.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );
      setTimeout(() => {
        this.loading = false;
      }, 3500);
    } else {
      this.submitTry = true;
    }
  }
}
