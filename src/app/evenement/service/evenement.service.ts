import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Evenement} from '../../models/Evenement.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable()
export class EvenementService {

  eventCache: Evenement;
  eventSubject = new Subject<Evenement[]>();
  searchEvent: Evenement[];
  currentEventEdition: Evenement = null;
  evenements: Evenement[] = [];
  nbEvent: number;
  eventWithAdresse: Evenement;

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  getEventByIntitule(intitule: string) {

    const evenement = this.evenements.find(
      (s) => {
        return s.intitule === intitule;
      }
    );
    return evenement;
  }

  getAdresseByEventAdresseGPS(id: string) {
    const evenement = this.evenements.find(
      (s) => {
        return s.adresse.gps === id;
      }
    );
    return evenement;
  }

  saveEventToServer(event: Evenement) {
    this.httpClient
      .post<Evenement>('http://localhost:8083/evenement', event, httpOptions)
      .subscribe(
        (eventAvecId) => {
          this.evenements.push(eventAvecId);
          console.log('Enregistrement terminé !');
          this.eventWithAdresse = eventAvecId;
        },
        (error) => {
          console.log(event);
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveEventToServerWithAdresse(event: Evenement): Observable<Evenement> {
    return this.httpClient
      .post<Evenement>('http://localhost:8083/evenement', event, httpOptions)
      .pipe(
        tap( eventWithId => this.eventWithAdresse = eventWithId )
      );

  }

  deleteEventToServer(event: Evenement) {
    this.httpClient
      .delete('http://localhost:8083/evenement/' + event.id)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  modifierEventToServer(event: Evenement) {
    this.httpClient
      .put('http://localhost:8083/evenement/' + event.id, event, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          console.log(event);
        },
        (error) => {
          console.log(event);
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAllEvents(): Observable<Evenement[]> {
      return this.httpClient
        .get<Evenement[]>('http://localhost:8083/evenements', httpOptions)
        .pipe(
          tap( evenements => this.evenements = evenements )
        );
  }

  getEventsParPage(limit, offset): Observable<Evenement[]> {
    return this.httpClient
      .get<Evenement[]>('http://localhost:8083/eventPage/' + limit + '/' + offset, httpOptions)
      .pipe(
        tap( evenements => this.evenements = evenements )
      );
  }

  searchEventToServer(input): Observable<Evenement[]> {
    return this.httpClient
      .get<Evenement[]>('http://localhost:8083/evenement/intitule/' + input, httpOptions)
      .pipe(
        tap( event => this.searchEvent = event )
      );
  }

  getEventToServerWithId2(id: string): Observable<Evenement> {
    console.log('je suis dans la fonction getEventById');
    return this.httpClient
      .get<Evenement>('http://localhost:8083/evenement/' + id, httpOptions)
      .pipe(
        tap( event => this.currentEventEdition = event )
      );
  }

  getNbEvenements(): Observable<number> {
   return this.httpClient.get<number>('http://localhost:8083/nbEvenement', httpOptions);
  }


}
