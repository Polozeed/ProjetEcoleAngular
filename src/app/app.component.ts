import {Component, OnInit} from '@angular/core';
import {EvenementService} from './evenement/service/evenement.service';
import { Observable } from 'rxjs/internal/Observable';
import {interval} from 'rxjs';
import {EditEvenementComponent} from './evenement/edit-evenement/edit-evenement.component';
import {EvenementViewComponent} from './evenement/evenement-view-list/evenement-view.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuth = false;
  secondes: number;

  constructor(private appareilService: EvenementService) { }

  ngOnInit() {
    const numbers = interval(1000);
    const counter = numbers.pipe();
    counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, Erreur! : ' + error);
      },
      () => {
        console.log('Observable Fini !');
      }
    );
  }

}
