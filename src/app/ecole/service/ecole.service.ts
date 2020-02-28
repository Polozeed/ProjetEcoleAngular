import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {Ecole} from '../../models/Ecole.model';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable()
export class EcoleService {

  private ecoles: Ecole[] = [];
  searchEcole: Ecole[];
  nbEcoles = 0;
  ecoleSubject = new Subject<Ecole[]>();

  constructor(private httpClient: HttpClient) {}

  emitEcoles() {
    this.ecoleSubject.next(this.ecoles.slice());
  }

  addEcole(ecole: Ecole) {
    this.ecoles.push(ecole);
    this.emitEcoles();
  }

  saveEcoleToServer(ecole: Ecole) {
    this.httpClient
      .post('http://localhost:8083/ecole', ecole, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log(ecole);
          console.log('Erreur ! : ' + error);
        }
      );
  }

  modifierEcoleToServer(ecole: Ecole) {
    this.httpClient
      .put('http://localhost:8083/ecole/' + ecole.idEcole, ecole, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          console.log(ecole);
        },
        (error) => {
          console.log(ecole);
          console.log('Erreur ! : ' + error);
        }
      );
  }

  deleteEcoleToServer(ecole: Ecole) {
    this.httpClient
      .delete('http://localhost:8083/ecole/' + ecole.idEcole)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log(ecole);
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getEcoleByNom(nom: string) {
    const ecole = this.ecoles.find(
      (s) => {
        return s.nom === nom;
      }
    );
    return ecole;
  }

  getAllEcoles(): Observable<Ecole[]> {
    if (this.ecoles.length === 0) {
      return this.httpClient
        .get<Ecole[]>('http://localhost:8083/ecole', httpOptions)
        .pipe(
          tap( ecoles => this.ecoles = ecoles )
        );
    } else {
      return of(this.ecoles);
    }
  }

  searchToServerWithIntitule( input): Observable<Ecole[]> {
    return this.httpClient
      .get<Ecole[]>('http://localhost:8083/ecole/nom/' + input)
      .pipe(
        tap(ecoles => this.ecoles = ecoles)
      );
  }

  searchToServerWithFormation( input): Observable<Ecole[]> {
    return this.httpClient
      .get<Ecole[]>('http://localhost:8083/ecole/formation/' + input)
      .pipe(
        tap(ecoles => this.ecoles = ecoles)
      );
  }

  searchToServerWithNvEtude( input): Observable<Ecole[]> {
    return this.httpClient
      .get<Ecole[]>('http://localhost:8083/ecole/niveauEtude/' + input)
      .pipe(
        tap(ecoles => this.ecoles = ecoles)
      );
  }

  searchToServerWithAdresse(input): Observable<Ecole[]> {
    return this.httpClient
      .get<Ecole[]>('http://localhost:8083/ecole/adresse/' + input)
      .pipe(
        tap(ecoles => this.ecoles = ecoles)
      );
  }

  getEcolesParPage(limit, offset): Observable<Ecole[]> {
    return this.httpClient
      .get<Ecole[]>('http://localhost:8083/ecolesPage/' + limit + '/' + offset, httpOptions)
      .pipe(
        tap(ecoles => this.ecoles = ecoles)
      );
  }

  getNbEcoles(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:8083/nbEcoles', httpOptions);
  }
}
