import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes`)
  }

  getHeroePorId(id: string): Observable<IHero> {
    return this.http.get<IHero>(`${this.baseUrl}/heroes/${id}`)
  }

  getSugerencias( termino:string ): Observable<IHero[]> {
    return this.http.get<IHero[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`) 
  }

  agregarHeroe(heroe: IHero): Observable<IHero>  {
    return this.http.post<IHero>(`${this.baseUrl}/heroes`, heroe)
  }

  actualizarHeroe(heroe: IHero): Observable<IHero>  {
    return this.http.put<IHero>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
  }

  borrarHeroe(id: string): Observable<any>  {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  }

}
