import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: false,
  template: `

    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar Gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >

  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private GifsService:GifsService ) { }

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;

    this.GifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }

}
