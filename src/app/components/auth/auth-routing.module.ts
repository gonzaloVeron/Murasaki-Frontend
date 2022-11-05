import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
          path: "",
          redirectTo: "login",
          pathMatch: "full",
      },
      {
          path: 'login',
          component: LoginComponent
      },
      {
        path: 'recovery',
        component: RecoveryComponent
      },
      {
        path: 'changePassword/:token',
        component: ChangePasswordComponent
      }
    ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
