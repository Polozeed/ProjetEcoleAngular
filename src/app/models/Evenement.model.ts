import {Adresse} from './Adresse.model';
import {Observable} from 'rxjs';
import DateTimeFormat = Intl.DateTimeFormat;

export class Evenement {

  constructor(
    public id: number,
    public intitule: string,
    public adresse: Adresse,
    public horaireDebut: DateTimeFormat,
    public horaireFin: DateTimeFormat,
    public description: string,
    public couleur: string,
  ) {}

}
