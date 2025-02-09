import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'K15h8B08G5KLzmuxNVL4f5qeU2teXWeb';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gif Service Ready')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if ( tag.trim().length === 0 )
      return;

    if(this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );

    this._tagsHistory.unshift( tag );

    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if( this._tagsHistory.length === 0 ) return;

    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this._serviceUrl }/search`, { params })
      .subscribe( resp => {
        this.gifsList = resp.data;
      });

  };

}
