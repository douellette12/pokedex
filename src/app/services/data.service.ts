import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, @Inject(String) private url: string) { }
  
  get() {
    return this.http.get(this.url)
  }

  setUrl(url: string) {
    this.url = url
  }
  getUrl() {
    return this.url
  }
}
