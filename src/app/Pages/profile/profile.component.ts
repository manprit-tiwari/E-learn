import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap } from 'rxjs';
import { ProfileUser } from 'src/app/Models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  
  user$ = this.userService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  })

  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      this.profileForm.patchValue({ ...user });
      this.userService.verifyUser({ ...user });
    })
    
  }

  uploadImage(event: any, user: ProfileUser){
    this.imageUploadService.uploadImage(event.target.files[0],`images/profile/${user.uid}`).pipe(
      this.toast.observe(
        {
          loading: 'Image is being uploaded...',
          success: 'Image Uploaded',
          error: 'There was an error in uploading.'
        }
      ),
      concatMap((photoURL) => this.userService.updateUser({ uid: user.uid, photoURL}))
    ).subscribe();
  }
  saveProfile(){
    const profileData = this.profileForm.value;
    this.userService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: 'Updating Data...',
        success: 'Data has been updated.',
        error: 'There was an error in updating the data'
      })
    ).subscribe();
  };

}
