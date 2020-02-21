import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {AdresseService} from '../service/adresseService';
import {Adresse} from '../../models/Adresse.model';
import {Evenement} from '../../models/Evenement.model';
import {EvenementService} from '../../evenement/service/evenement.service';
import {Observable, of} from 'rxjs';
import {async} from '@angular/core/testing';
import {catchError, map, tap} from 'rxjs/operators';
import {element} from 'protractor';
import {assembleBoundTextPlaceholders} from '@angular/compiler/src/render3/view/i18n/util';

@Component({
  selector: 'app-new-adresse',
  templateUrl: './new-adresse.component.html',
  styleUrls: ['./new-adresse.component.css']
})
export class NewAdresseComponent implements OnInit {

  adresseEnCours: Adresse;
  eventEnCours: Evenement;

  nomRue: string;
  numRue: bigint;
  nomVille: string;
  departement: string;
  codePostal: bigint;
  pays: string;
  gps: string;
  nom: string;

  constructor(private formBuilder: FormBuilder,
              private adresseService: AdresseService,
              private eventService: EvenementService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.idEvent;
    this.eventService.getEventToServerWithId2(id).subscribe(event => this.eventEnCours = event);
  }

  onSaveNewAdresse() {
    this.adresseEnCours = new Adresse(0, this.nomRue,
      this.numRue, this.nomVille, this.codePostal, this.departement, this.pays, this.gps);
    this.adresseService.saveAdresseServer(this.adresseEnCours).subscribe(
      adresse => {
        console.log('addre :' + adresse);
        this.onEditEventEnCours(adresse);
      }
    );
  }

  onEditEventEnCours(resultatAdrese: Adresse) {
    const eventRetour: Evenement = new Evenement(this.eventEnCours.id, this.eventEnCours.intitule, resultatAdrese,
      this.eventEnCours.horaireDebut, this.eventEnCours.horaireFin, this.eventEnCours.description, this.eventEnCours.couleur);
    this.eventService.modifierEventToServer(eventRetour);
    this.retourEvenement(1);
  }

  retourEvenement(type: number) {
    if ( typeof(type) === 'undefined' ) {
      this.router.navigate(['/event/' + this.eventEnCours.intitule]);
    } else {
      this.router.navigate(['/event/']);
    }


  }


}
