import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SongService } from 'src/app/songs/song.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
})
export class ReadPage implements OnInit {

  songId:any
  song:any=[]

  constructor(public ss:SongService, public ac:AlertController, public router:Router, public ar:ActivatedRoute) { }

  ngOnInit() {

    this.songId = this.ar.snapshot.paramMap.get('id')
    this.song = this.ss.readSong(this.songId).valueChanges()

  }

  async deleteSong(){
    const Alert = await this.ac.create({
      message:'Desea Eliminar la Canción?',
      buttons:[
        {text:'Cancelar', role:'cancel', handler:blah=>{
          console.log('Confirmó su cancelacion')
        }},
        {text:'Ok', handler:()=>{
          this.ss.deleteSong(this.songId).then(()=>this.router.navigateByUrl('/list'))
        }}
      ]
    })
    await Alert.present()
  }



}
