import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Logged in successfully');
        this.loadUser();
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
