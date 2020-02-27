import {Component, OnInit} from '@angular/core';
import {EvenementService} from './evenement/service/evenement.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private eventService: EvenementService) { }

  ngOnInit() {

  }

}
