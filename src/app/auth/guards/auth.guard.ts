import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   
      // if (this.authService.auth.id) {
      //   return true;
      // }
  
      // console.log('Bloqueado por el AuthGuard - CanActivate')
      // return false;

      return this.authService.verificaAutenticacion()
               .pipe(
                 tap(estaAutenticado => {
                   if (!estaAutenticado) {
                    this.router.navigate(['./auth/login']);
                   } 
                 })
               );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      // if (this.authService.auth.id) {
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - CanLoad')
      // return false;

      return this.authService.verificaAutenticacion()
               .pipe(
                 tap(estaAutenticado => {
                   if (!estaAutenticado) {
                   this.router.navigate(['./auth/login']);
                   } 
                 })
               );
  }
}
