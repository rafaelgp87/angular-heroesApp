import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IHero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: IHero[] = [];
  heroeSelecionado: IHero | undefined;

  constructor(private heroesServicce: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesServicce.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if(!event.option.value) {
      this.heroeSelecionado = undefined;
      return;
    }

    const heroe: IHero = event.option.value;
    this.termino = heroe.superhero;

    this.heroesServicce.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.heroeSelecionado = heroe);
  }

}
