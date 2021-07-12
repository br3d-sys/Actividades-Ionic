import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore'
import { AuthService } from 'src/app/servicios/auth/auth.service'
import firebase from 'firebase/app'
@Injectable({
  providedIn: 'root'
})
export class EventoService {

  public referenceList: firebase.firestore.CollectionReference

  constructor(public af:AngularFirestore, public as:AuthService) { }

  async createEvent(eventName:string, eventDate:string, eventPrice:number, eventCost:number):Promise<DocumentReference>{
    const user:firebase.User = await this.as.obtenerUsuario()
    this.referenceList = firebase.firestore().collection(`userProfile/${user.uid}/eventList`)
    return this.referenceList.add({
      name:eventName,
      date:eventDate,
      price:eventPrice*1,
      cost:eventCost*1,
      income:eventCost*-1,
    })
  }

  eventList():Promise<firebase.firestore.QuerySnapshot>{
    const user:any=  this.as.obtenerUsuario()
    this.referenceList = firebase.firestore().collection(`userProfile/${user.uid}/eventList`)
    return this.referenceList.get()
  }

  getEventDetail(eventId:string):Promise<firebase.firestore.QueryDocumentSnapshot>{
    const user:any= this.as.obtenerUsuario()
    this.referenceList = firebase.firestore().collection(`userProfile/${user.uid}/eventList`)
    return this.referenceList.doc(eventId).get()
  }

  async addguests(guestName:string, eventId:string, eventPrice:number):Promise<void>{
    return this.af.doc(eventId).collection(`guestList`).add({
      guestName
    }).then((newguest)=>{
      return this.af.firestore.runTransaction(transaction=>{
        return transaction.get(this.referenceList.doc(eventId)).then(docEvent=>{
          const newIncome= docEvent.data().income + eventPrice
          transaction.update(this.referenceList.doc(eventId), {income:newIncome})
        })
      })
    })
  }

}
