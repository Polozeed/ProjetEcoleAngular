import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EvenementService} from '../service/evenement.service';
import {Evenement} from '../../models/Evenement.model';
import {Adresse} from '../../models/Adresse.model';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mwl-demo-component',
  templateUrl: './new-evenement-component.html',
  styleUrls: ['./new-evenement-component.css']
})
export class NewEvenementComponent implements OnInit {

  EventForm: FormGroup;
  id: null;
  intitule: string;
  adresse: Adresse;
  horaireDebut: DateTimeFormat;
  horaireFin: DateTimeFormat;
  description: string;
  couleur: string;
  private eventEncours: Evenement;
  private eventSauvegarde: Evenement;

  constructor(private appareilService: EvenementService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
  }

  onAjouter() {
    this.eventEncours = new Evenement(this.id, this.intitule, this.adresse, this.horaireDebut,
      this.horaireFin, this.description, this.couleur);
    this.appareilService.saveEventToServer(this.eventEncours);
    this.router.navigate(['/event/']);
  }

  demandeAjoutAdresse() {
    if (confirm('Voulez vous ajouter une adresse?')) {
      this.ajoutAdresse();
    }
  }

  ajoutAdresse() {
    this.eventEncours = new Evenement(this.id, this.intitule, this.adresse, this.horaireDebut,
      this.horaireFin, this.description, this.couleur);
    this.appareilService.eventWithAdresse = this.eventEncours;
    this.appareilService.saveEventToServerWithAdresse(this.eventEncours)
      .subscribe(
        (eventAvecId) => {
          this.router.navigate(['/event/' + eventAvecId.intitule + '/new-adresse/' + eventAvecId.id]);
        });
  }

}
