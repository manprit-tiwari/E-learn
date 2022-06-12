import { Component, OnInit } from '@angular/core';
import { ProfileUser } from 'src/app/Models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ProfileData: ProfileUser[] = [];

  constructor(private userService: UsersService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authService.currentUser$);
    this.userService.currentUserProfile$.subscribe((user) => {
      if (user.uid == 'xxgywU2La0gISioiG4STp0wECFq2') {
        localStorage.setItem('Admin', 'true');
      }
      else {
        const temp = localStorage.getItem('Admin');
        if (temp) {
          localStorage.removeItem('Admin');
        }
      }
    })
  }


}
