import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CollaborateurService} from '../service/collaborateur.service';
import {Collaborateur} from '../../models/Collaborateur.model';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-collaborateur.component.html',
  styleUrls: ['./new-collaborateur.component.css']
})
export class NewCollaborateurComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

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

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      fonction: ['', Validators.required],
      adresseMail: ['', Validators.email],
      numTel: ['', Validators.min(8)],
      dateNaissance: ['', Validators.required],
      commentaire: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    return true;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onAjouter() {
    this.collabEncours = new Collaborateur(this.id, this.nom, this.prenom, this.fonction,
      this.adresseMail, this.numTel, this.dateNaissance,
      this.commentaire, this.type);
    this.userService.saveToServer(this.collabEncours);
    this.router.navigate(['/collaborateur']);
  }

}
