import {Adresse} from './Adresse.model';

export class Ecole {

  constructor(
    public idEcole: number,
    public nom: string,
    public specialite: string,
    public nbEtudiants: BigInteger,
    public adresse: Adresse,
  ) {}
}
