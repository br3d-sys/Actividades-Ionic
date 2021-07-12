import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/servicios/eventos/evento.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  eventList:any=[]
  constructor(public es:EventoService) { }

  ngOnInit() {
    this.es.eventList().then(eventListSnapShot=>{
      this.eventList= []
      eventListSnapShot.forEach(snap=>{
        this.eventList.push({
          id:snap.id,
          name:snap.data().name,
          price:snap.data().price,
          date: snap.data().date
        })
        return false
      })
    })
  }

}
