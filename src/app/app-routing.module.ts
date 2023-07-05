import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { AuthService } from './services/auth.service';

function userLoginGuard(): boolean {
  const isLoggedIn = inject(AuthService).isUserLoggedIn()
  if (!isLoggedIn) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true
}

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent, canActivate: [userLoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
