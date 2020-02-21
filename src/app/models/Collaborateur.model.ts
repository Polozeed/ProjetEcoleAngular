import DateTimeFormat = Intl.DateTimeFormat;

export class Collaborateur {

  constructor(
    public  id: number,
    public nom: string,
    public prenom: string,
    public fonction: string,
    public mail: string,
    public numeroTel: string,
    public dateNaissance: Date,
    public commentaire: string,
    public type: string,

  ) {}
}
