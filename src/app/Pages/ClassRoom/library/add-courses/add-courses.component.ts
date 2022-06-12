import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  CourseUploadForm = new FormGroup({
    CourseName: new FormControl('',[Validators.required]),
    CourseURL: new FormControl('',[Validators.required]),
    CourseDiscription: new FormControl('',[Validators.required]),
    Year: new FormControl('',[Validators.required]),
    Semester: new FormControl('',[Validators.required]),
  })

  constructor(
    private courseService: CoursesService,
    
  ) { }

  ngOnInit(): void {
  }

  UploadCourse(){
    const courseData = this.CourseUploadForm.value;
    this.courseService.addCourse(courseData);
  };

}
