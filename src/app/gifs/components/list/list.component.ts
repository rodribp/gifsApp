import { Component, computed, input } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html'
})
export class ListComponent {
  gifs = input.required<Gif[]>()
  dividedGifs = computed(() => {
    const currentGifs = this.gifs();
    const factor = Math.floor(this.gifs().length / 3);

    return [currentGifs.slice(0, factor), currentGifs.slice(factor, factor * 2), currentGifs.slice(factor * 2)];
  })
}
