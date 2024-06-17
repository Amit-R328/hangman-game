import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public basePath = window.location.pathname.includes('hangman-game') ? '/hangman-game/assets/data.json' : '/assets/data.json';

  constructor( private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.basePath);
  }
}
