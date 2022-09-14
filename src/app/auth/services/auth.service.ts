import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: IAuth | undefined;

  get auth(): IAuth {
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {

    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<IAuth>(`${this.baseUrl}/usuarios/1`)
             .pipe(
              map(auth => {
                this._auth = auth;
                return true;
              })
             );
  }

  login() {
    return this.http.get<IAuth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      );
  }

  logout() {
    this._auth = undefined;
  }

}
