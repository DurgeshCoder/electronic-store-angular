import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { CategoriesComponent } from './components/common/categories/categories.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home: Electronic Store',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About: Electronic Store',
  },
  {
    path: 'features',
    component: FeatureComponent,
    title: 'Features: Electronic Store',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login: Electronic Store',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup: Electronic Store',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Categories: Electronic Store',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
