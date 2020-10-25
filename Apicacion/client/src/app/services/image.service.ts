import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  url:string = "http://localhost:3009/";

  create(photo:File){
    const fd = new FormData;
    fd.append('image',photo)
    return this.http.post(`${this.url}image/`,fd);
  }
}
