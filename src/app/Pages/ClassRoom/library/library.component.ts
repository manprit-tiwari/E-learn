import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { CoursesInfo } from 'src/app/Models/courses';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { AddCoursesComponent } from './add-courses/add-courses.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  

  Admin = localStorage.getItem('Admin');

  allCourses: CoursesInfo[] = [];
  isRefreshign: boolean = false;

  user$ = this.userService.currentUserProfile$;
  CourseUploadForm = new FormGroup({
    CourseId: new FormControl(''),
    CourseName: new FormControl(''),
    CourseURL: new FormControl(''),
    CourseDiscription: new FormControl(''),
    Year: new FormControl(''),
    Semester: new FormControl(''),
  })


  constructor(
    private toast: HotToastService,
    private courseService: CoursesService,
    private userService: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.FetchCourse();
    
  }

  refreshCourse(){
    this.FetchCourse()

  }

  FetchCourse(){
    this.isRefreshign = true;
    this.courseService.getCourse()
    .subscribe((Course) => {
      console.log(Course);
      this.allCourses = Course;
      this.isRefreshign = false
    })
  }
  DeleteCourse(id: string){
    this.courseService.removeCourse(id)
    .pipe(
      this.toast.observe({
        loading: 'Deleting Course Data...',
        success: 'Course Data has been Deleted.',
        error: 'There was an error in Deleting the Course data'
      })
    ).subscribe();
  }
  openDialog() {
    this.dialog.open(AddCoursesComponent, { width: '400px'});
  }

}
