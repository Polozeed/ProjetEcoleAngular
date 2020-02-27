import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EcoleService} from '../service/ecole.service';


@Component({
  selector: 'app-new-ecole',
  templateUrl: './new-ecole.component.html',
  styleUrls: ['./new-ecole.component.css']
})
export class NewEcoleComponent implements OnInit {

  ecoleForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ecoleService: EcoleService,
              private router: Router) {
  }

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

  onSave() {
    console.log(this.ecoleForm.value);
    this.ecoleService.saveEcoleToServer(this.ecoleForm.value);
  }

  onVoir() {
    this.ecoleService.getAllEcoles();
  }

}
