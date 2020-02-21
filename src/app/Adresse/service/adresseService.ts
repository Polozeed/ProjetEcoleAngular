import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {errorObject} from 'rxjs/internal-compatibility';
import {Adresse} from '../../models/Adresse.model';
import {EvenementService} from '../../evenement/service/evenement.service';
import {tap} from 'rxjs/operators';
import {Evenement} from '../../models/Evenement.model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable()
export class AdresseService {

  private adresseReturn: Adresse;
  private adresses: Adresse[] = [];
  ecoleSubject = new Subject<Adresse[]>();

  constructor(private httpClient: HttpClient,
              private eventService: EvenementService) {
  }

  emitEcoles() {
    this.ecoleSubject.next(this.adresses.slice());
  }

  saveAdresseServer(adresse: Adresse): Observable<Adresse> {
      return this.httpClient
      .post<Adresse>('http://localhost:8083/adresse', adresse, httpOptions)
      .pipe(
        tap( adressse => this.adresseReturn = adressse )
      );
  }

  // @ts-ignore
  saveAdresseToServer(adresse: Adresse): Adresse {
 this.httpClient
      .post<Adresse>('http://localhost:8083/adresse', adresse, httpOptions)
      .subscribe(
        res => {
          console.log('Sauvegarde terminé !');
          console.log(res);
          return res;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  modifierAdresseToServer(adresse: Adresse) {
    this.httpClient
      .put('http://localhost:8083/adresse/' + adresse.idAdresse, adresse, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log(adresse);
          console.log('Erreur ! : ' + error);
        }
      );
  }

}
