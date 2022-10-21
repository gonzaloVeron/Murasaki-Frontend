import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IsAuthGuard } from './components/shared/guards/is-auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "app/sidebar/students",
    pathMatch: "full"
  },
  {
    path: "app",
    redirectTo: "app/sidebar/students",
    pathMatch: "full"
  },
  {
    path: 'app',
    component: AppComponent,
    canActivate: [IsAuthGuard],
    children: [
      {
        path: 'sidebar',
        component: SidebarComponent,
        children: [
          {
            path: 'students',
            component: StudentsComponent,
          },
          {
            path: 'student/:id',
            component: StudentDetailsComponent,
          },
          {
            path: 'student-form',
            component: StudentFormComponent
          },
          {
            path: 'student-form/:id',
            component: StudentFormComponent
          },
          {
            path: 'teachers',
            component: TeachersComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
