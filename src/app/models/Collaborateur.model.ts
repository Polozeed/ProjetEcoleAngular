export class Collaborateur {
  constructor(
    public nom: string,
    public prenom: string,
    public mail: string,
    public type: string,
    public formation?: string[]
  ) {}
}
