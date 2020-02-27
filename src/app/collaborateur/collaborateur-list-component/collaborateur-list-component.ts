import {Component, OnInit} from '@angular/core';
import {Collaborateur} from '../../models/Collaborateur.model';
import {Observable} from 'rxjs';
import {CollaborateurService} from '../service/collaborateur.service';

@Component({
  selector: 'app-user-list-component',
  templateUrl: './collaborateur-list-component.html',
  styleUrls: ['./collaborateur-list-component.css']
})
export class CollaborateurListComponent implements OnInit {

  collabs: Observable<Collaborateur[]>;
  resUserSearch: Observable<Collaborateur[]>;
  private limit = 9;
  private offset = 0;
  private pageEnCours = 1;
  private totalPageMax = 0;

  constructor(private userService: CollaborateurService) {
  }

  ngOnInit() {
    this.selectionneNbAffichage();
  }

  rechercheCollab(event) {
    const inputValue = event.target.value;
    if (inputValue.length > 4) {
      console.log(inputValue);
      this.resUserSearch = this.userService.searchCollabToServer(inputValue);
    }
  }

  pageSuivante() {
    if (this.pageEnCours <= this.totalPageMax) {
      this.offset = this.offset + this.limit;
      this.collabs = this.userService.getCollabParPage(this.limit, this.offset);
    }
  }

  pagePrecedente() {
    if (this.offset !== 0) {
      this.pageEnCours = this.pageEnCours - 1;
      this.offset = this.offset - this.limit;
      this.collabs = this.userService.getCollabParPage(this.limit, this.offset);
    }
  }

  selectionneNbAffichage() {
    // @ts-ignore
    if (document.getElementById('opt5').checked) {
      this.limit = 9;
      this.nombreDePage();
    }
    // @ts-ignore
    if (document.getElementById('opt10').checked) {
      this.limit = 18;
      this.nombreDePage();
    }
    // @ts-ignore
    if (document.getElementById('opt25').checked) {
      this.limit = 36;
      this.nombreDePage();
    }
    this.collabs = this.userService.getCollabParPage(this.limit, this.offset);
  }

  nombreDePage() {
    this.pageEnCours = 1;
    this.userService.getNbCollabs().subscribe(nb => {
      this.userService.nbCollabs = nb;
      const nbEvent = this.userService.nbCollabs;
      const valPageMax = nbEvent / this.limit;
      this.totalPageMax = 0;
      for (let i = 0; i <= valPageMax; i++) {
        this.totalPageMax = this.totalPageMax + 1;
      }
    });
  }

}
