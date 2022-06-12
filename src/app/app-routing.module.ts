import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { LibraryComponent } from './Pages/ClassRoom/library/library.component';
import { SyllabusComponent } from './Pages/ClassRoom/syllabus/syllabus.component';
import { HomeComponent } from './Pages/home/home.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'signUp',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'ClassRoom/Syllabus',
    component: SyllabusComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'ClassRoom/Library',
    component: LibraryComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path: 'About-us',
    component: AboutUsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
