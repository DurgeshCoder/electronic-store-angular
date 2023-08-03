import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { normalUserGuard } from './guards/normal-user.guard';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { adminUserGuard } from './guards/admin-user.guard';
import { HomeComponent as AdminHome } from './components/admin/home/home.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
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
  {
    path: 'user',
    component: DashboardComponent,
    title: 'UserDashboard',
    canActivate: [normalUserGuard],
  },
  {
    path: 'admin',
    component: AdminDashboard,
    title: 'Admin Dashboard',
    canActivate: [adminUserGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AdminHome,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        title: 'Add Product',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
