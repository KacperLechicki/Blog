import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginGuard: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Logged in successfully');
        this.loadUser();
        this.loginGuard = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }

  loadUser(): void {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
}
