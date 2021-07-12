import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from 'src/app/servicios/eventos/evento.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public currentEvent:any={}
  public eventId:string
  public guestName=""

  constructor(public es:EventoService, public ar:ActivatedRoute) { }

  ngOnInit() {
    const eventId = this.ar.snapshot.paramMap.get('id')
    this.es.getEventDetail(eventId).then(eventSnapShot=>{
      this.currentEvent=eventSnapShot.data()
      this.currentEvent.id=eventSnapShot.id
    })
  }

  addGuest(guestName:string):void{
    this.es.addguests(guestName,this.currentEvent.id, this.currentEvent.eventPrice).then(() => this.guestName='')
  }

}
