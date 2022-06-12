import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

export function passwordMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  }, { validators: passwordMatchValidator() })

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }
  get name() {
    return this.signUpForm.get('name');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  submit() {
    if (!this.signUpForm.valid) return;

    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(email, password).pipe(
      switchMap(({user: {uid}}) => this.userService.addUser({uid, email, displayName: name})),
      this.toast.observe({
        success: 'Congrats! you are all signed up',
        loading: 'Signing in.....',
        error: ({ message }) => `${ message }`
      })
    ).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

}
