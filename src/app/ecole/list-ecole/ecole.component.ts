import {Component, OnInit} from '@angular/core';
import {EcoleService} from '../service/ecole.service';
import {Ecole} from '../../models/Ecole.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ecole',
  templateUrl: 'ecole.component.html',
  styleUrls: ['ecole.component.css']
})
export class EcoleComponent implements OnInit {

  ecoles: Observable<Ecole[]>;
  resEcole: Observable<Ecole[]>;
  input: string;
  private limit = 9;
  private offset = 0;
  private pageEnCours = 1;
  private totalPageMax = 0;

  constructor(private ecoleService: EcoleService) {
  }

  ngOnInit() {
    this.selectionneNbAffichage();
  }

  rechercheEcoleParIntitule(input: string) {
    this.resEcole = this.ecoleService.searchToServerWithIntitule(input);
  }

  rechercheEcoleParFormation(input: string) {
    this.resEcole = this.ecoleService.searchToServerWithFormation(input);
  }

  rechercheEcoleParNvEtude(input: string) {
    this.resEcole = this.ecoleService.searchToServerWithNvEtude(input);
  }

  rechercheEcoleParAdresse(input: string) {
    this.resEcole = this.ecoleService.searchToServerWithAdresse(input);
  }

  pageSuivante() {
    if (this.pageEnCours <= this.totalPageMax) {
      this.offset = this.offset + this.limit;
      this.ecoles = this.ecoleService.getEcolesParPage(this.limit, this.offset);
    }
  }

  pagePrecedente() {
    if (this.offset !== 0) {
      this.pageEnCours = this.pageEnCours - 1;
      this.offset = this.offset - this.limit;
      this.ecoles = this.ecoleService.getEcolesParPage(this.limit, this.offset);
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
    this.ecoles = this.ecoleService.getEcolesParPage(this.limit, this.offset);
  }

  nombreDePage() {
    this.pageEnCours = 1;
    this.ecoleService.getNbEcoles().subscribe(nb => {
      this.ecoleService.nbEcoles = nb;
      const nbEvent = this.ecoleService.nbEcoles;
      const valPageMax = nbEvent / this.limit;
      this.totalPageMax = 0;
      for (let i = 0; i <= valPageMax; i++) {
        this.totalPageMax = this.totalPageMax + 1;
      }
    });
  }
}

