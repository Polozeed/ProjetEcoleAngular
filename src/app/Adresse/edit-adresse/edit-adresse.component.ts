import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollaborateurService} from '../../Collaborateur/Service/Collaborateur.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Collaborateur} from '../../models/Collaborateur.model';
import {EcoleService} from '../Service/Ecole.service';
import {Ecole} from '../../models/Ecole.model';
import {Evenement} from '../../models/Evenement.model';
import {EvenementService} from '../../Evenement/Service/evenement.service';
import {Adresse} from '../../models/Adresse.model';

@Component({
  selector: 'app-new-ecole',
  templateUrl: './edit-ecole.component.html',
  styleUrls: ['./edit-ecole.component.css']
})
export class EditEcoleComponent implements OnInit {



  constructor(private ecoleService: EcoleService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }




  private ecoleEncours: Ecole;
  ecoleForm: FormGroup;

  @Input() id: null;
  @Input() nom: string;
  @Input() nbEtudiant: BigInteger;
  @Input() adresse: Adresse;
  @Input() specialite: string;
  @Input() formation: Set<string>;
  @Input() contact: Set<Collaborateur>;



  ngOnInit() {
    // Recuperation des infos de l'event
    const id = this.route.snapshot.params['id'];
    //this.id = this.ecoleService.getEcoleByNom(id).id;
    this.nom = this.ecoleService.getEcoleByNom(id).nom;
    this.nbEtudiant = this.ecoleService.getEcoleByNom(id).nbEtudiants;
    this.specialite = this.ecoleService.getEcoleByNom(id).specialite;
    this.contact = this.ecoleService.getEcoleByNom(id).contact;
    this.formation = this.ecoleService.getEcoleByNom(id).formations;
    this.adresse = this.ecoleService.getEcoleByNom(id).adresse;
  }


  onEdit() {
    this.ecoleEncours = new Ecole(this.id, this.nom, this.specialite,
      this.nbEtudiant, this.adresse, this.formation, this.contact);
    this.ecoleService.saveEcoleToServer(this.ecoleEncours);
    this.router.navigate(['/ecole']);

  }

  refresh(): void {
    window.location.reload();
  }

}
