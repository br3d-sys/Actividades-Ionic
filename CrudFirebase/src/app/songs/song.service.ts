import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { songInterface } from 'src/app/songs/songInterface'

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(public firebase:AngularFirestore) { }

  createSong(albumName:string, artistName:string, songDescription:string, songName:string):Promise<void>{
    const id = this.firebase.createId()
    return this.firebase.doc(`songList/${id}`).set({id,albumName,artistName,songDescription,songName})
  }

  readSongList():AngularFirestoreCollection<songInterface>{
    return this.firebase.collection(`songList`)
  }

  readSong(songId:string):AngularFirestoreDocument<songInterface>{
    return this.firebase.collection(`songList`).doc(songId)
  }

  deleteSong(songId):Promise<void>{
    return this.firebase.doc(`songList/${songId}`).delete()
  }

  updateSong(songId:string, albumName:string, artistName:string, songDescription:string, songName:string):Promise<void>{
    return this.firebase.collection(`songList`).doc(songId).update({albumName,artistName,songDescription,songName})
  }


}
