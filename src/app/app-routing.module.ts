import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { InterestsComponent } from './components/interests/interests.component';
import { IsAuthGuard } from './components/shared/guards/is-auth.guard';
import { IsNotAuthGuard } from './components/shared/guards/is-not-auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TransferStudentsComponent } from './components/transfer-students/transfer-students.component';

const routes: Routes = [
  {
    path: "",
    //redirectTo: "app/sidebar/students",
    redirectTo: "auth",
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
    children: [
      {
        path: 'sidebar',
        component: SidebarComponent,
        canActivate: [IsAuthGuard],
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
          },
          {
            path: 'interests',
            component: InterestsComponent
          },
          {
            path: 'transfer/:idSource/:idTarget',
            component: TransferStudentsComponent
          }
        ]
      }
    ]
  },
  {
    path: "auth",
    canActivate: [IsNotAuthGuard],
    loadChildren: () => import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
