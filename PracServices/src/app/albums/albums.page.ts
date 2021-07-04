import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/servicios/album.service';
import { Observable } from "rxjs"

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {

  result:Observable<any>
  constructor(public AS:AlbumService) {
    this.result = this.AS.getAlbums()
   }

  ngOnInit() {
  }

}
