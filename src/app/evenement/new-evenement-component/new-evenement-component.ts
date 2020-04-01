import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EvenementService} from '../service/evenement.service';
import {Evenement} from '../../models/Evenement.model';
import {Adresse} from '../../models/Adresse.model';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mwl-demo-component',
  templateUrl: './new-evenement-component.html',
  styleUrls: ['./new-evenement-component.css']
})
export class NewEvenementComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;

  id: null;
  intitule: string;
  adresse: Adresse;
  horaireDebut: DateTimeFormat;
  horaireFin: DateTimeFormat;
  description: string;
  couleur: string;
  private eventEncours: Evenement;
  private eventSauvegarde: Evenement;

  constructor(private appareilService: EvenementService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      description: [''],
      horaireDebut: ['', Validators.required],
      horaireFin: ['', Validators.required],
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
    if (this.onSubmit() === true) {
      this.appareilService.saveEventToServer(this.registerForm.value);
      this.router.navigate(['/event/']);
    }
  }

  demandeAjoutAdresse() {
    if (this.onSubmit() === true) {
      if (confirm('Voulez vous ajouter une adresse?')) {
        this.ajoutAdresse();
      }
    }
  }

  ajoutAdresse() {
    this.eventEncours = this.registerForm.value;
    this.appareilService.eventWithAdresse = this.eventEncours;
    this.appareilService.saveEventToServerWithAdresse(this.eventEncours)
      .subscribe(
        (eventAvecId) => {
          this.router.navigate(['/event/' + eventAvecId.intitule + '/new-adresse/' + eventAvecId.id]);
        });
  }
}
