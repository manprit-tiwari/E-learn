import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ProfileUser } from 'src/app/Models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    // localStorage.setItem('UserEmail', this.UserEmail);
    if (this.loginForm.valid) {
      console.log('sucess')
      // let UserEmail = this.loginForm.value;

      // console.log(this.userService.currentUserProfile$);
      // return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: 'Invalid Email or Password'
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

}
