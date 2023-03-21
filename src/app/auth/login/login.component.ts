import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;
  loginForm!: FormGroup;
  submitTry: boolean = false;

  constructor(
    private loadingS: LoadingService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.loadingStart();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.loading = this.loadingS.loadingStop();
    }, 1000);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitTry = false;
      this.auth.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );
    } else {
      this.submitTry = true;
    }
  }
}
