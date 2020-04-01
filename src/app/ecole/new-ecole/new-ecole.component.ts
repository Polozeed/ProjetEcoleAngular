import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EcoleService} from '../service/ecole.service';
import {Ecole} from '../../models/Ecole.model';


@Component({
  selector: 'app-new-ecole',
  templateUrl: './new-ecole.component.html',
  styleUrls: ['./new-ecole.component.css']
})
export class NewEcoleComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  private ecoleEncours: Ecole;

  constructor(private formBuilder: FormBuilder,
              private ecoleService: EcoleService,
              private router: Router) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      specialite: ['', Validators.required],
      nbEtudiants: ['', Validators.required]
    });
  }

  onVoir() {
    this.ecoleService.getAllEcoles();
  }

  onSave() {
    console.log('je clique enregistrer');
    this.ecoleService.saveEcoleToServer(this.registerForm.value);
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

  demandeAjoutAdresse() {
    if (this.onSubmit() === true) {
      if (confirm('Voulez vous ajouter une adresse?')) {
        this.ajoutAdresse();
      }
    }
  }

  ajoutAdresse() {
    this.ecoleEncours = this.registerForm.value;
    console.log(this.ecoleEncours);
    this.ecoleService.ecoleWithId = this.ecoleEncours;
    this.ecoleService.saveEcoleToServerWithAdresse(this.ecoleEncours)
      .subscribe(
        (ecoleWithId) => {
          this.router.navigate(['/ecole/' + ecoleWithId.nom + '/new-adresse/' + ecoleWithId.idEcole]);
        });
  }


}
