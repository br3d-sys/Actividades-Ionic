import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/songs/song.service'
import { FormBuilder,Validators } from '@angular/forms'
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  public createForm:any

  constructor(public ss:SongService, public fb:FormBuilder, public lc:LoadingController, public route:Router) {
    this.createForm = fb.group({
      albumName:['',Validators.required],
      artistName:['',Validators.required],
      songDescription:['',Validators.required],
      songName:['',Validators.required]
    })
   }

  ngOnInit() {
  }

  async createSong(){
    const loading = await this.lc.create()
    const albumName = this.createForm.value.albumName
    const artistName = this.createForm.value.artistName
    const songDescription = this.createForm.value.songDescription
    const songName = this.createForm.value.songName

    this.ss.createSong(albumName,artistName,songDescription,songName).then(
      ()=>{
        loading.dismiss().then(()=>{
          this.route.navigateByUrl('/list')
        })
      },error=>{
        console.error(error)
      }
    )

    return await loading.present()
  }

}
