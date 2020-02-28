import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Adresse} from '../../models/Adresse.model';
import {AdresseService} from '../service/adresseService';
import {EvenementService} from '../../evenement/service/evenement.service';

@Component({
  selector: 'app-new-ecole',
  templateUrl: './edit-adresse.component.html',
  styleUrls: ['./edit-adresse.component.css']
})
export class EditAdresseComponent implements OnInit {

  private adresseEncours: Adresse;
  idAdresse: number;
  nomRue: string;
  numRue: bigint;
  nomVille: string;
  departement: string;
  codePostal: bigint;
  pays: string;
  gps: string;
  nom: string;

  constructor(private adresseService: AdresseService,
              private eventService: EvenementService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.idAdresse = this.eventService.getAdresseByEventAdresseGPS(id).adresse.idAdresse;
    this.nomRue = this.eventService.getAdresseByEventAdresseGPS(id).adresse.nomRue;
    this.numRue = this.eventService.getAdresseByEventAdresseGPS(id).adresse.numRue;
    this.nomVille = this.eventService.getAdresseByEventAdresseGPS(id).adresse.nomVille;
    this.departement = this.eventService.getAdresseByEventAdresseGPS(id).adresse.departement;
    this.codePostal = this.eventService.getAdresseByEventAdresseGPS(id).adresse.codePostal;
    this.pays = this.eventService.getAdresseByEventAdresseGPS(id).adresse.pays;
    this.gps = this.eventService.getAdresseByEventAdresseGPS(id).adresse.gps;
    this.nom = this.eventService.getAdresseByEventAdresseGPS(id).intitule;
  }

  onEdit() {
    this.adresseEncours = new Adresse(this.idAdresse, this.nomRue, this.numRue,
      this.nomVille, this.codePostal,
      this.departement, this.pays, this.gps);
    this.adresseService.modifierAdresseToServer(this.adresseEncours);
    this.router.navigate(['/event']);
  }
}
