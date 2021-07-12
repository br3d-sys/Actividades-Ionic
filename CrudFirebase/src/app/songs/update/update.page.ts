import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../song.service';
import { Validators, FormBuilder } from '@angular/forms'
import { songInterface } from '../songInterface'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  updateForm:any=[]
  song:any
  songId:any

  constructor(public ss:SongService, public ar:ActivatedRoute, public fb:FormBuilder, public ac:AlertController, public router:Router) {

    this.updateForm = this.fb.group({
      albumName:['',Validators.required],
      artistName:['',Validators.required],
      songDescription:['',Validators.required],
      songName:['',Validators.required]
    })

    this.songId = this.ar.snapshot.paramMap.get('id')
    this.song = this.ss.readSong(this.songId).valueChanges().subscribe(result =>{
      this.updateForm.controls['albumName'].setValue(result.albumName)
      this.updateForm.controls['artistName'].setValue(result.artistName)
      this.updateForm.controls['songDescription'].setValue(result.songDescription)
      this.updateForm.controls['songName'].setValue(result.songName)
    })

    

   }

  ngOnInit() {

  }

  async updateSong(){
    console.log(this.songId)
    const Alert = await this.ac.create({
      message:'Desea Actualizar el Registro?',
      buttons:[
        {text:'Cancelar', role:'cancel', handler:blah=>{
          console.log("Canceló la actualizacion")
        }},
        {text:'Ok',handler:()=>{
              this.ss.updateSong(this.songId,this.updateForm.value.albumName,this.updateForm.value.artistName,this.updateForm.value.songDescription,this.updateForm.value.songName).then(()=>this.router.navigateByUrl(`/read/${this.songId}`))
        }}
      ]
    })

    await Alert.present()

  }

}
