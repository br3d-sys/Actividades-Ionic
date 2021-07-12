import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from 'src/app/songs/song.service'


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  songList:any=[]

  constructor(public ss:SongService, public router:Router) { }

  ngOnInit() {
    this.songList = this.ss.readSongList().valueChanges()
  }

}
