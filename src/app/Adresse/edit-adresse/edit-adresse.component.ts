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

    this.adresseService.getAdresseById(id).subscribe(adresse => {
      console.log(adresse);
      console.log('e suis la ');
      this.idAdresse = adresse.idAdresse;
      this.nomRue = adresse.nomRue;
      this.numRue = adresse.numRue;
      this.nomVille = adresse.nomVille;
      this.departement = adresse.departement;
      this.codePostal = adresse.codePostal;
      this.pays = adresse.pays;
      this.gps = adresse.gps;
    });

  }

  onEdit() {
    this.adresseEncours = new Adresse(this.idAdresse, this.nomRue, this.numRue,
      this.nomVille, this.codePostal,
      this.departement, this.pays, this.gps);
    this.adresseService.modifierAdresseToServer(this.adresseEncours);
    this.router.navigate(['/event']);
  }
}
