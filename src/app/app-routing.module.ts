import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "app/students",
    pathMatch: "full"
  },
  {
    path: "app",
    redirectTo: "app/students",
    pathMatch: "full"
  },
  {
    path:'app',
    component: AppComponent,
    children: [
      {
        path:'students',
        component: StudentsComponent,
      },
      {
        path:'student/:id',
        component: StudentDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
