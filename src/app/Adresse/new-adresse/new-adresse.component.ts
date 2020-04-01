import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AdresseService} from '../service/adresseService';
import {Adresse} from '../../models/Adresse.model';
import {Evenement} from '../../models/Evenement.model';
import {EvenementService} from '../../evenement/service/evenement.service';
import {EcoleService} from '../../ecole/service/ecole.service';
import {Ecole} from '../../models/Ecole.model';


@Component({
  selector: 'app-new-adresse',
  templateUrl: './new-adresse.component.html',
  styleUrls: ['./new-adresse.component.css']
})
export class NewAdresseComponent implements OnInit {

  adresseEnCours: Adresse;
  eventEnCours: Evenement;
  ecoleEnCours: Ecole;
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
              private ecoleService: EcoleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].toString() === 'ecole') {
      const id = this.route.snapshot.params.idEcole;
      console.log(id);
      this.ecoleService.getEcoleToServerWithId(id).subscribe(ecole => this.ecoleEnCours = ecole);
    }
    if (this.route.snapshot.url[0].toString() === 'event') {
      const id = this.route.snapshot.params.idEvent;
      this.eventService.getEventToServerWithId2(id).subscribe(event => this.eventEnCours = event);
    }
  }

  onSaveNewAdresse() {
    this.adresseEnCours = new Adresse(0, this.nomRue,
      this.numRue, this.nomVille, this.codePostal, this.departement, this.pays, this.gps);
    this.adresseService.saveAdresseServer(this.adresseEnCours).subscribe(
      adresse => {
        if (this.route.snapshot.url[0].toString() === 'ecole') {
          this.onEditEcoleEnCours(adresse);
        } else {
          this.onEditEventEnCours(adresse);
        }
      }
    );
  }

  onEditEventEnCours(resultatAdrese: Adresse) {
    const eventRetour: Evenement = new Evenement(this.eventEnCours.id, this.eventEnCours.intitule, resultatAdrese,
      this.eventEnCours.horaireDebut, this.eventEnCours.horaireFin, this.eventEnCours.description, this.eventEnCours.couleur);
    this.eventService.modifierEventToServer(eventRetour);
    this.retourPage(1);
  }

  onEditEcoleEnCours(resultatAdrese: Adresse) {
    const ecoleRetour: Ecole = new Ecole(this.ecoleEnCours.idEcole, this.ecoleEnCours.nom,
      this.ecoleEnCours.specialite, this.ecoleEnCours.nbEtudiants, resultatAdrese);
    this.ecoleService.modifierEcoleToServer(ecoleRetour);
    this.retourPage(2);
  }

  retourPage(type: number) {
    if (type === 1) {
      this.router.navigate(['/event/']);
    }
    if (type === 2) {
      this.router.navigate(['/ecole/']);
    }
  }


}
