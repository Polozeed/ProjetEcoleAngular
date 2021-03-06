import {Collaborateur} from '../../models/Collaborateur.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable()
export class CollaborateurService {

  private collabs: Collaborateur[] = [];
  private searchCollabs: Collaborateur[];
  nbCollabs = 0;
  userSubject = new Subject<Collaborateur[]>();

  constructor(private httpClient: HttpClient) {}

  emitUsers() {
    this.userSubject.next(this.collabs.slice());
  }

  addUser(collaborateur: Collaborateur) {
    this.collabs.push(collaborateur);
    this.emitUsers();
  }

  saveToServer(collaborateur: Collaborateur) {
    this.httpClient
      .post('http://localhost:8083/collaborateur', collaborateur, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log(collaborateur);
        }
      );
  }

  searchCollabToServer(input): Observable<Collaborateur[]> {
    return this.httpClient
      .get<Collaborateur[]>('http://localhost:8083/collaborateur/' + input, httpOptions)
      .pipe(
        tap( col => this.searchCollabs = col )
      );
  }

  modifierCollabToServer(collab: Collaborateur) {
    this.httpClient
      .put('http://localhost:8083/collaborateur/' + collab.id, collab, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          console.log(collab);
        },
        (error) => {
          console.log(collab);
          console.log('Erreur ! : ' + error);
        }
      );
  }

  deleteToServer(collaborateur: Collaborateur) {
    this.httpClient
      .delete('http://localhost:8083/collaborateur/' + collaborateur.id)
      .subscribe(
        () => {
          console.log('Suppression terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  modifierContactToServer(collab: Collaborateur) {
    this.httpClient
      .put('http://localhost:8083/contact/' + collab.id, collab, httpOptions)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getCollabById(nom: string) {
    const collab = this.collabs.find(
      (s) => {
        return s.nom === nom;
      }
    );
    return collab;
  }

  getAllPersonne(): Observable<Collaborateur[]> {
      return this.httpClient
        .get<Collaborateur[]>('http://localhost:8083/personne', httpOptions)
        .pipe(
          tap( collab => this.collabs = collab )
        );
  }

  getCollabParPage(limit, offset): Observable<Collaborateur[]> {
    return this.httpClient
      .get<Collaborateur[]>('http://localhost:8083/collabPage/' + limit + '/' + offset, httpOptions)
      .pipe(
        tap( collaborateurs => this.collabs = collaborateurs )
      );
  }

  getNbCollabs(): Observable<number> {
    return this.httpClient.get<number>('http://localhost:8083/nbCollabs', httpOptions);
  }
}
