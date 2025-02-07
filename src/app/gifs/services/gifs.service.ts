import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

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

  }

  public searchTag(tag: string): void {
    this.organizeHistory(tag);
  }


}
