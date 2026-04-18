import { Component, computed, inject } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  imports: [ListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
}
