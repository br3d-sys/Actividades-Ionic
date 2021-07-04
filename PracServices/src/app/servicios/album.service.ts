import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(public http:HttpClient) { }

  getAlbums():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/photos')
  }

  getDetalle(id):Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/photos/'+id)
  }

}
