import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/servicios/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  info = null;
  constructor(public AR:ActivatedRoute, public AS:AlbumService) { }

  ngOnInit() {
    let id = this.AR.snapshot.paramMap.get('id')
    this.AS.getDetalle(id).subscribe(
      result=>{
        this.info = result
      }
    )
  }

}
