import { Routes } from '@angular/router';
import { Auth } from './core/app.auth'
export const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: "main", loadChildren: "./main/main.module#MainModule", canActivate: [Auth] }

  //  { path: '**', redirectTo: 'main/index' }
]