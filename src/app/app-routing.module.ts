import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingComponent } from './components/pending/pending.component';
import { FileListComponent } from './file-list/file-list.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateDetailsComponent } from './pages/admin/update-details/update-details.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { ListuserComponent } from './pages/listuser/listuser.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile/uploadfile.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ViewFileComponent } from './view-file/view-file.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'update',
        component: UpdateDetailsComponent,
      },
      {
        path: 'upload',
        component: UploadfileComponent,
      },
      {
        path: 'listFile',
        component: FileListComponent,
      },
      {
        path: 'users',
        component: ListuserComponent,
      },
      {
        path: 'pending-task',
        component: PendingComponent
      }

      //more admin components will go here
    ],
  },
  {
    path: 'view-file/:id',
    component: ViewFileComponent,
  },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard],
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
