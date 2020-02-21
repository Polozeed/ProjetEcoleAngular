import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CollaborateurService} from '../service/collaborateur.service';
import {Collaborateur} from '../../models/Collaborateur.model';
import {Evenement} from '../../models/Evenement.model';
import {EvenementService} from '../../evenement/service/evenement.service';
import {Ecole} from '../../models/Ecole.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.css']
})
export class EditCollaborateurComponent implements OnInit {

  private collaborateurEnCours: Collaborateur;
  @Input() id: number;
  @Input() prenom: string;
  @Input() nom: string;
  @Input() fonction: string;
  @Input() adresseMail: string;
  @Input() numTel: string;
  @Input() dateNaissance: Date;
  @Input() commentaire: string;
  @Input() type: string;

  constructor(private formBuilder: FormBuilder,
              private userService: CollaborateurService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.id = this.userService.getCollabById(id).id;
    this.nom = this.userService.getCollabById(id).nom;
    this.prenom = this.userService.getCollabById(id).prenom;
    this.fonction = this.userService.getCollabById(id).fonction;
    this.adresseMail = this.userService.getCollabById(id).mail;
    this.numTel = this.userService.getCollabById(id).numeroTel;
    this.dateNaissance = this.userService.getCollabById(id).dateNaissance;
    this.type = this.userService.getCollabById(id).type;
    this.commentaire = this.userService.getCollabById(id).commentaire;
  }

  onModifier() {
    this.collaborateurEnCours = new Collaborateur(this.id, this.nom, this.prenom,
      this.fonction, this.adresseMail, this.numTel,
      this.dateNaissance, this.commentaire, this.type )
    this.userService.modifierCollabToServer(this.collaborateurEnCours);
    this.router.navigate(['/collaborateur']);
  }

  onDelete() {
    this.collaborateurEnCours = new Collaborateur(this.id, this.nom, this.prenom,
      this.fonction, this.adresseMail, this.numTel,
      this.dateNaissance, this.commentaire, this.type )
    this.userService.deleteToServer(this.collaborateurEnCours);
    this.router.navigate(['/collaborateur']);
  }
}
