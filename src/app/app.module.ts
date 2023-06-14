import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { MatTableModule } from '@angular/material/table';
import { UpdateDetailsComponent } from './pages/admin/update-details/update-details.component';
import { UploadfileComponent } from './pages/uploadfile/uploadfile/uploadfile.component';
import { FileListComponent } from './file-list/file-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewFileComponent } from './view-file/view-file.component';
import { ListuserComponent } from './pages/listuser/listuser.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PendingComponent } from './components/pending/pending.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    UpdateDetailsComponent,
    UploadfileComponent,
    FileListComponent,
    ViewFileComponent,
    ListuserComponent,
    PendingComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    NgxPaginationModule,
    MatSidenavModule,
    
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
