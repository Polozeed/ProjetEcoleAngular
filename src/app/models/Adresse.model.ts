import DateTimeFormat = Intl.DateTimeFormat;

export class Adresse{

  constructor(
    public idAdresse: number,
    public nomRue: string,
    public numRue: bigint,
    public nomVille: string,
    public codePostal: bigint,
    public departement: string,
    public pays: string,
    public gps: string,
  ) {}
}
