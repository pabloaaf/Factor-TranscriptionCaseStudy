import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/index/login/login.component';
import { LoginCallbackComponent } from './views/index/login-callback/login-callback.component';
import { MockDataComponent } from './views/user/mock-data/mock-data.component';
import { ProfessorComponent } from './views/user/professor/professor.component';
import { StudentComponent } from './views/user/student/student.component';
import { EditVideoComponent } from './views/video/edit-video/edit-video.component';
import { ShowVideoComponent } from './views/video/show-video/show-video.component';
import { AuthGuard } from './globals/helpers/auth.guard';


const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'callback', component: LoginCallbackComponent},
	{path: 'professor', redirectTo: 'prof/index', pathMatch: 'full'},
	{path: 'prof/index', component: ProfessorComponent},
	{path: 'prof/show/:id', component: ShowVideoComponent},
	{path: 'prof/video/edit/:id', component: EditVideoComponent},
	{path: 'student', redirectTo: 'std/index', pathMatch: 'full'},
	{path: 'std/index', component: StudentComponent},
	{path: 'std/show/:id', component: ShowVideoComponent},
	{path: 'mockcourses', component: MockDataComponent},
	{path: 'googleauth', canActivate: [AuthGuard], component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
