import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/servicios/eventos/evento.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  eventName:string;
  eventDate:string;
  eventPrice:number;
  eventCost:number;

  constructor(public router:Router, public es:EventoService) { }

  ngOnInit() {
  }

  createEvent(eventName:string, eventDate:string, eventPrice:number, eventCost:number):void{
    if (eventName==undefined || eventDate==undefined || eventPrice==undefined || eventCost==undefined) {
      return
    }
    this.es.createEvent(eventName, eventDate, eventPrice, eventCost).then(
      ()=>{
        this.router.navigateByUrl('/start')
      }
    )
  }

}
