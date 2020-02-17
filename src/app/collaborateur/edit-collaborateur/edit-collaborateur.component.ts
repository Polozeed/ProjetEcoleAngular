import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CollaborateurService} from '../Service/Collaborateur.service';
import {Collaborateur} from '../../models/Collaborateur.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-collaborateur.component.html',
  styleUrls: ['./new-collaborateur.component.css']
})
export class NewCollaborateurComponent implements OnInit {

  CollaborateurForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: CollaborateurService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.CollaborateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      fonction: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      commentaire: ['', Validators.required],
      type: ['', Validators.required],
      formation: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    const formValue = this.CollaborateurForm.value;
    const newUser = new Collaborateur(
      formValue['nom'],
      formValue['prenom'],
      formValue['fonction'],
      formValue['mail'],
      formValue['numeroTel'],
      formValue['dateNaissance'],
      formValue['Type'],
      formValue['formation'] ? formValue['formation'] : []
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }

  getFormation(): FormArray {
    return this.CollaborateurForm.get('formation') as FormArray;
  }

  onAddFormation() {
    const newFormationControl = this.formBuilder.control(null, Validators.required);
    this.getFormation().push(newFormationControl);
  }

  onSave() {
    console.log(this.CollaborateurForm.value);
    this.userService.saveToServer(this.CollaborateurForm.value);
  }

  onVoir() {
    this.userService.getAllPersonne();
  }

}
