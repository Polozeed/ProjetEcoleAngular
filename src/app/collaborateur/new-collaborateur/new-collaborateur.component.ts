import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CollaborateurService} from '../service/collaborateur.service';
import {Collaborateur} from '../../models/Collaborateur.model';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-collaborateur.component.html',
  styleUrls: ['./new-collaborateur.component.css']
})
export class NewCollaborateurComponent implements OnInit {

  CollaborateurForm: FormGroup;
  id: null;
  prenom: string;
  nom: string;
  fonction: string;
  adresseMail: string;
  numTel: string;
  dateNaissance: Date;
  commentaire: string;
  type: string;
  private collabEncours: Collaborateur;

  constructor(private userService: CollaborateurService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
  }

  onAjouter() {
    this.collabEncours = new Collaborateur(this.id, this.nom, this.prenom, this.fonction,
      this.adresseMail, this.numTel, this.dateNaissance,
      this.commentaire, this.type);
    this.userService.saveToServer(this.collabEncours);
    this.router.navigate(['/collaborateur']);
  }

}
