import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CollaborateurService} from '../service/collaborateur.service';
import {Collaborateur} from '../../models/Collaborateur.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './edit-collaborateur.component.html',
  styleUrls: ['./edit-collaborateur.component.css']
})

export class EditCollaborateurComponent implements OnInit {

  private collaborateurEnCours: Collaborateur;
  id: number;
  prenom: string;
  nom: string;
  fonction: string;
  adresseMail: string;
  numTel: string;
  dateNaissance: Date;
  commentaire: string;
  type: string;

  constructor(private formBuilder: FormBuilder,
              private userService: CollaborateurService,
              private route: ActivatedRoute,
              private router: Router) { }

  collabForm = this.formBuilder.group({
    id: [''],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    fonction: ['', Validators.required],
    adresseMail: ['', [Validators.required, Validators.email]],
    numTel: ['', [Validators.required, Validators.minLength(8)]],
    dateNaissance: ['', Validators.required],
    commentaire: [''],
    type: ['', Validators.required]
  });

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
    console.log(this.collabForm);
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
