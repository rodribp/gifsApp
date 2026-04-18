import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifsHistory = localStorage.getItem('gifsHistory') ?? '{}';
  return JSON.parse(gifsHistory);
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem('gifsHistory', JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
      }
    }).subscribe((res) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        q: query
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      tap((items) => {
        this.searchHistory.update((prevHistory) => {
          return {
            ...prevHistory,
            [query.toLowerCase()]: items,
          }
        })
      })
    );
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }

  deleteHistoryGifs() {
    this.searchHistory.set({});
  }
}