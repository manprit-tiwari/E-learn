import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursesInfo } from '../Models/courses';
import { map } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

// import { from, Observable, of, switchMap } from 'rxjs';
// import { Firestore } from '@angular/fire/firestore';
// import { doc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    // private firestore: Firestore,
    private http: HttpClient,
    private toast: HotToastService
  ) {}
  //   addCourse(Course: CoursesInfo): Observable<any>{
  //     const ref = doc(this.firestore, 'Courses', Course?.CourseId);
  //     return from(setDoc(ref, Course));
  //   }
  //   updateCourse(Course: CoursesInfo): Observable<any>{
  //     const ref = doc(this.firestore, 'Courses');
  //     return from(updateDoc(ref, {...Course}));
  //   }
  addCourse(Course: CoursesInfo){
    console.log(Course);
    return this.http.post('https://e-learn-2cfa4-default-rtdb.firebaseio.com/Courses.json', Course)
    .pipe(
      this.toast.observe({
        loading: 'Updating Course Data...',
        success: 'Course Data has been updated.',
        error: 'There was an error in updating the Course data'
      })
    ).subscribe();
  }
  getCourse(){
    return this.http.get('https://e-learn-2cfa4-default-rtdb.firebaseio.com/Courses.json')
    .pipe(map((res: any) => {
      const Course = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          Course.push({...res[key], id: key})
        }
      }
      return Course;
    })
    )
  }
  removeCourse(id: string){
    return this.http.delete('https://e-learn-2cfa4-default-rtdb.firebaseio.com/Courses/'+id+'.json')
  }
}
