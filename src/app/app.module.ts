import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { CustomNavbarComponent } from './components/common/custom-navbar/custom-navbar.component';
import { AdminNavbarComponent } from './components/common/admin-navbar/admin-navbar.component';
import { CategoriesComponent } from './components/common/categories/categories.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducers';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { ViewProductsComponent } from './components/admin/view-products/view-products.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewOrdersComponent } from './components/admin/view-orders/view-orders.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconHomeCheck,
  IconCirclePlus,
  IconBuildingStore,
  IconCategoryFilled,
  IconFileDiff,
  IconUsersGroup,
  IconTruckReturn,
  IconLogout2,
} from 'angular-tabler-icons/icons';
import { JwtInterceptor } from './services/JwtInterceptor';
import { SingleCategoryViewComponent } from './components/common/single-category-view/single-category-view.component';
import { categoryReducer } from './store/category/category.reducers';
import { QuillModule } from 'ngx-quill';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './components/pages/user/user.component';
import { UserViewComponent } from './components/common/user-view/user-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoreComponent } from './components/pages/store/store.component';
import { SingleProductCardComponent } from './components/common/single-product-card/single-product-card.component';
import { CategoriesViewComponent } from './components/common/categories-view/categories-view.component';
import { StoreCategoriesComponent } from './components/pages/store-categories/store-categories.component';

const icons = {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconHomeCheck,
  IconCirclePlus,
  IconBuildingStore,
  IconCategoryFilled,
  IconFileDiff,
  IconUsersGroup,
  IconTruckReturn,
  IconLogout2,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    FeatureComponent,
    CustomNavbarComponent,
    AdminNavbarComponent,
    CategoriesComponent,
    DashboardComponent,
    AddProductComponent,
    ViewProductsComponent,
    AddCategoriesComponent,
    ViewCategoriesComponent,
    ViewOrdersComponent,
    ViewUsersComponent,
    AdminDashboard,
    SingleCategoryViewComponent,
    UserComponent,
    UserViewComponent,
    StoreComponent,
    SingleProductCardComponent,
    CategoriesViewComponent,
    StoreCategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
    }),
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      cat: categoryReducer,
    }),
    TablerIconsModule.pick(icons),
    QuillModule.forRoot({
      modules: {
        syntax: false,
      },
    }),
    SweetAlert2Module.forRoot({}),
    InfiniteScrollModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
