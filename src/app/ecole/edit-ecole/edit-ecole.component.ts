import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Collaborateur} from '../../models/Collaborateur.model';
import {EcoleService} from '../service/ecole.service';
import {Ecole} from '../../models/Ecole.model';
import {Adresse} from '../../models/Adresse.model';

@Component({
  selector: 'app-new-ecole',
  templateUrl: './edit-ecole.component.html',
  styleUrls: ['./edit-ecole.component.css']
})
export class EditEcoleComponent implements OnInit {

  private ecoleEncours: Ecole;
  ecoleForm: FormGroup;
  adresse: Adresse;
  idEcole: number;
  nom: string;
  nbEtudiant: BigInteger;
  specialite: string;
  formation: Set<string>;
  contact: Set<Collaborateur>;

  constructor(private ecoleService: EcoleService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.idEcole = this.ecoleService.getEcoleByNom(id).idEcole;
    this.nom = this.ecoleService.getEcoleByNom(id).nom;
    this.nbEtudiant = this.ecoleService.getEcoleByNom(id).nbEtudiants;
    this.specialite = this.ecoleService.getEcoleByNom(id).specialite;
    this.contact = this.ecoleService.getEcoleByNom(id).contact;
    this.formation = this.ecoleService.getEcoleByNom(id).formations;
    this.adresse = this.ecoleService.getEcoleByNom(id).adresse;
  }

  onEdit() {
    this.ecoleEncours = new Ecole(this.idEcole, this.nom, this.specialite, this.nbEtudiant, this.adresse, this.formation, this.contact);
    this.ecoleService.modifierEcoleToServer(this.ecoleEncours);
    this.router.navigate(['/ecole']);
  }

  onDelete() {
    this.ecoleEncours = new Ecole(this.idEcole, this.nom, this.specialite, this.nbEtudiant, this.adresse, this.formation, this.contact);
    this.ecoleService.deleteEcoleToServer(this.ecoleEncours);
    this.router.navigate(['/ecole']);
  }

}
