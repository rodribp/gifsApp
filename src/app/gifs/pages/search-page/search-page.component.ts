import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  imports: [ListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {
  gifService = inject(GifService);
  gifs = signal<Gif[]>([])

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((res) => {
      this.gifs.set(res);
    });
  }
}
