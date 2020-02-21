import DateTimeFormat = Intl.DateTimeFormat;
import {Adresse} from './Adresse.model';
import {Collaborateur} from './Collaborateur.model';

export class Ecole {

  constructor(
    public idEcole: number,
    public nom: string,
    public specialite: string,
    public nbEtudiants: BigInteger,
    public adresse: Adresse,
    public formations: Set<string>,
    public contact: Set<Collaborateur>,
  ) {}
}
