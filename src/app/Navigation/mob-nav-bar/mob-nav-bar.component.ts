import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mob-nav-bar',
  templateUrl: './mob-nav-bar.component.html',
  styleUrls: ['./mob-nav-bar.component.css']
})
export class MobNavBarComponent implements OnInit {

  two = false;
  three = false;
  user$ = this.userService.currentUserProfile$;


  Two() {
    if (this.two == false) {
      this.two = true;
      this.three = false;
      console.log('Two true!...');
    }
    else if (this.two == true) {
      this.two = false;
      console.log('Two false!...');
    }
  }
  Three() {
    if (this.three == false) {
      this.three = true;
      this.two = false;
      console.log('Three true!...');
    }
    else if (this.three == true) {
      this.three = false;
      console.log('Three false!...');
    }
  }

  constructor(
    private authService: AuthenticationService,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
