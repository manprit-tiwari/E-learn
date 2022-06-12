import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './Navigation/nav-bar/nav-bar.component';
import { MobNavBarComponent } from './Navigation/mob-nav-bar/mob-nav-bar.component';
import { FooterComponent } from './Navigation/footer/footer.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { HomeComponent } from './Pages/home/home.component';
import { SyllabusComponent } from './Pages/ClassRoom/syllabus/syllabus.component';
import { LibraryComponent } from './Pages/ClassRoom/library/library.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { MaterialModule } from './Material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './Pipes/safe.pipe';
import { HotToastModule } from '@ngneat/hot-toast';
import { AddCoursesComponent } from './Pages/ClassRoom/library/add-courses/add-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MobNavBarComponent,
    FooterComponent,
    LandingComponent,
    HomeComponent,
    SyllabusComponent,
    LibraryComponent,
    AboutUsComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    SafePipe,
    AddCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HttpClientModule,
    HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
