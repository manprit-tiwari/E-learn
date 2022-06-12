import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MobNavBarComponent } from '../mob-nav-bar/mob-nav-bar.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  MobileMenu = false;
  user$ = this.userService.currentUserProfile$;

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private userService: UsersService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(MobNavBarComponent, { width: '400px'});
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
