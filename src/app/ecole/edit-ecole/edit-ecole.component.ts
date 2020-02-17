import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CollaborateurService} from '../../Collaborateur/Service/Collaborateur.service';
import {Router} from '@angular/router';
import {Collaborateur} from '../../models/Collaborateur.model';
import {EcoleService} from '../Service/Ecole.service';
import {Ecole} from '../../models/Ecole.model';

@Component({
  selector: 'app-new-ecole',
  templateUrl: './new-ecole.component.html',
  styleUrls: ['./new-ecole.component.css']
})
export class NewEcoleComponent implements OnInit {

  ecoleForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ecoleService: EcoleService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ecoleForm = this.formBuilder.group({
      nom: ['', Validators.required],
      specialite: ['', Validators.required],
      nbEtudiants: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.ecoleForm.value;
    const newEcole = new Ecole(
      formValue['nom'],
      formValue['specialite'],
      formValue['nbEtudiants'],
      formValue['adresse'],
    );
    this.ecoleService.addEcole(newEcole);
    this.router.navigate(['/ecole']);
  }
  onSave() {
    console.log(this.ecoleForm.value);
    this.ecoleService.saveEcoleToServer(this.ecoleForm.value);
  }

  onVoir() {
    this.ecoleService.getAllEcole();
  }

}
