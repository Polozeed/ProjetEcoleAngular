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

  constructor(private ecoleService: EcoleService) {
  }

  ngOnInit() {
    this.ecoles = this.ecoleService.getAllEcoles();
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
}
