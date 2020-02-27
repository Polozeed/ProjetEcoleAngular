import {Component, OnInit} from '@angular/core';
import {EvenementService} from '../service/evenement.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Evenement} from '../../models/Evenement.model';
import {Adresse} from '../../models/Adresse.model';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-appareil',
  templateUrl: './edit-evenement.component.html',
  styleUrls: ['./edit-evenement.component.css']
})
export class EditEvenementComponent implements OnInit {

  EventForm: FormGroup;
  id: number;
  intitule: string;
  adresse?: Adresse;
  horaireDebut: DateTimeFormat;
  horaireFin: DateTimeFormat;
  description: string;
  couleur: string;
  private eventEncours: Evenement;
  private adresseVide: boolean;

  constructor(private eventService: EvenementService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {

    const id = this.route.snapshot.params.id;
    this.id = this.eventService.getEventByIntitule(id).id;
    this.intitule = this.eventService.getEventByIntitule(id).intitule;
    this.description = this.eventService.getEventByIntitule(id).description;
    this.adresse = this.eventService.getEventByIntitule(id).adresse;
    this.horaireDebut = this.eventService.getEventByIntitule(id).horaireDebut;
    this.horaireFin = this.eventService.getEventByIntitule(id).horaireFin;
    this.couleur = this.eventService.getEventByIntitule(id).couleur;
  }

  onModifier() {
    let selectElmt;
    selectElmt = document.getElementById('typeCouleur');
    this.couleur = selectElmt.options[selectElmt.selectedIndex].value;
    this.eventEncours = new Evenement(this.id, this.intitule, this.adresse,
      this.horaireDebut, this.horaireFin, this.description, this.couleur);
    this.eventService.modifierEventToServer(this.eventEncours);
    this.router.navigate(['/event']);
  }

  onDelete() {
    this.eventEncours = new Evenement(this.id, this.intitule, this.adresse,
      this.horaireDebut, this.horaireFin, this.description, this.couleur);
    this.eventService.deleteEventToServer(this.eventEncours);
    this.router.navigate(['/event']);
  }

  delete_confirm() {
    if (confirm('Voulez vous vraiment supprimer ce contenu ?')) {
      this.onDelete();
      alert('Suppression effectuée');
    }
  }


}
