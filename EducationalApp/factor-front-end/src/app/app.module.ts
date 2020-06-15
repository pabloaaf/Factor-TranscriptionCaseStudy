import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/index/login/login.component';
import { LoginCallbackComponent } from './views/index/login-callback/login-callback.component';
import { MockDataComponent } from './views/user/mock-data/mock-data.component';
import { ProfessorComponent } from './views/user/professor/professor.component';
import { StudentComponent } from './views/user/student/student.component';
import { EditVideoComponent } from './views/video/edit-video/edit-video.component';
import { ShowVideoComponent } from './views/video/show-video/show-video.component';
import { ModelsComponent } from './globals/models/models.component';
import { VideoPhrasePipe } from './globals/helpers/video-phrase.pipe';
import { AuthGuard } from './globals/helpers/auth.guard';
import { HeaderComponent } from './globals/navbars/header/header.component';
import { FooterComponent } from './globals/navbars/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCallbackComponent,
    MockDataComponent,
    ProfessorComponent,
    StudentComponent,
    EditVideoComponent,
    ShowVideoComponent,
    ModelsComponent,
    VideoPhrasePipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
