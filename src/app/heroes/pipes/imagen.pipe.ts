import { Pipe, PipeTransform } from '@angular/core';
import { IHero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: IHero): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
