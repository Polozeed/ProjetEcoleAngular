import {Component, OnDestroy, OnInit} from '@angular/core';
import {EvenementService} from '../service/evenement.service';
import {Observable} from 'rxjs';
import {Evenement} from '../../models/Evenement.model';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-appareil-view',
  templateUrl: './evenement-view.component.html',
  styleUrls: ['./evenement-view.component.css']
})
export class EvenementViewComponent implements OnInit, OnDestroy {

  evenements: Observable<Evenement[]>;
  resSearch: Observable<Evenement[]>;
  noResSearch: boolean;

  private limit = 2;
  private offset = 0;
  private totalPageMax = 0;
  private pageEnCours = 1;

  constructor(private eventService: EvenementService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.selectionneNbElementAffichage();
  }

  ngOnDestroy() {
  }

  pageSuivante() {
    this.pageEnCours = this.pageEnCours + 1;
    if (this.pageEnCours <= this.totalPageMax) {
      this.offset = this.offset + this.limit;
      this.evenements = this.eventService.getEventsParPage(this.limit, this.offset);
    }
  }

  pagePrecedente() {
    if (this.offset !== 0) {
      this.pageEnCours = this.pageEnCours - 1;
      this.offset = this.offset - this.limit;
      this.evenements = this.eventService.getEventsParPage(this.limit, this.offset);
    } else {
    }
  }

  nombreDePage() {
    this.pageEnCours = 1;
    this.eventService.getNbEvenements().subscribe(nb => {
      this.eventService.nbEvent = nb;
      const nbEvent = this.eventService.nbEvent;
      const valPageMax = nbEvent / this.limit;
      this.totalPageMax = 0;
      for (let i = 0; i <= valPageMax; i++) {
        this.totalPageMax = this.totalPageMax + 1;
      }
    });
  }

  selectionneNbElementAffichage() {

    // @ts-ignore
    if (document.getElementById('opt5').checked) {
      this.limit = 5;
      this.nombreDePage();
    }
    // @ts-ignore
    if (document.getElementById('opt10').checked) {
      this.limit = 10;
      this.nombreDePage();
    }
    // @ts-ignore
    if (document.getElementById('opt25').checked) {
      this.limit = 25;
      this.nombreDePage();
    }
    this.evenements = this.eventService.getEventsParPage(this.limit, this.offset);
  }

  rechercheEvent(event) {
    const inputValue = event.target.value;
    if (inputValue.length > 4) {
      this.resSearch = this.eventService.searchEventToServer(inputValue);
      if (this.resSearch === null) {
        this.noResSearch = true;
      }
    }
  }

}

