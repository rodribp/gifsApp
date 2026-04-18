import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  imageUrl = input.required<string>();
  imageTitle = input.required<string>();
  async downloadGif() {
    const url = this.imageUrl();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const blob = await response.blob();
      const path = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.setAttribute('type', 'hidden');
      a.href = path;
      a.download = this.imageTitle();
      a.click();
      a.remove();
      window.URL.revokeObjectURL(path);
    } catch (e) {
      console.error('Failed to download Gif: ', e);
    }
  }
}
