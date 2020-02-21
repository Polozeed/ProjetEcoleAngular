import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EditEvenementComponent } from './evenement/edit-evenement/edit-evenement.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EvenementService} from './evenement/service/evenement.service';
import { AuthComponent } from './authentification/auth/auth.component';
import { EvenementViewComponent } from './evenement/evenement-view-list/evenement-view.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './authentification/service/auth.service';
import { QuatreCentQuatreComponent } from './erreur/quatre-cent-quatre/quatre-cent-quatre.component';
import { AuthGuardService } from './authentification/service/auth-guard.service';
import { NewEvenementComponent } from './evenement/new-evenement-component/new-evenement-component';
import {CollaborateurService} from './collaborateur/service/collaborateur.service';
import { CollaborateurListComponent } from './collaborateur/collaborateur-list-component/collaborateur-list-component';
import { NewCollaborateurComponent } from './collaborateur/new-collaborateur/new-collaborateur.component';
import {HttpClientModule} from '@angular/common/http';
import { EcoleComponent } from './ecole/list-ecole/ecole.component';
import { NewEcoleComponent } from './ecole/new-ecole/new-ecole.component';
import {EcoleService} from './ecole/service/ecole.service';
import {EditCollaborateurComponent} from './collaborateur/edit-collaborateur/edit-collaborateur.component';
import {EditEcoleComponent} from './ecole/edit-ecole/edit-ecole.component';
import {EditAdresseComponent} from './Adresse/edit-adresse/edit-adresse.component';
import {NewAdresseComponent} from './Adresse/new-adresse/new-adresse.component';
import {AdresseService} from './Adresse/service/adresseService';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {DemoComponent} from './evenement/agenda/agenda';
import {FlatpickrModule} from 'angularx-flatpickr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';


const appRoutes: Routes = [
  { path: 'event', component: EvenementViewComponent },
  { path: 'event/:id', component: EditEvenementComponent },
  { path: 'event/:id/:id', component: EditAdresseComponent },
  { path: 'edit', component: NewEvenementComponent },
  { path: 'editEvent/:id', component: EditEvenementComponent },
  { path: '', component: EvenementViewComponent },
  { path: 'collaborateur', component: CollaborateurListComponent },
  { path: 'new-collab', component: NewCollaborateurComponent },
  { path: 'collaborateur/:id', component: EditCollaborateurComponent },
  { path: 'new-ecole', component: NewEcoleComponent },
  { path: 'ecole', component: EcoleComponent },
  { path: 'test', component: DemoComponent },
  { path: 'ecole/:id', component: EditEcoleComponent },
  { path: 'ecole/:id/:id', component: EditAdresseComponent },
  { path: 'new-adresse', component: NewAdresseComponent },
  { path: 'event/:id/new-adresse/:idEvent', component: NewAdresseComponent },
  { path: 'not-found', component: QuatreCentQuatreComponent },
  { path: '**', redirectTo: 'not-found' },
];
@NgModule({
  declarations: [
    AppComponent,
    EditEvenementComponent,
    AuthComponent,
    EvenementViewComponent,
    QuatreCentQuatreComponent,
    NewEvenementComponent,
    CollaborateurListComponent,
    NewCollaborateurComponent,
    EditCollaborateurComponent,
    EcoleComponent,
    EditEcoleComponent,
    NewEcoleComponent,
    EditAdresseComponent,
    NewAdresseComponent,
    DemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModalModule,
    CommonModule,
  ],
  providers: [
    EvenementService,
    AuthService,
    AuthGuardService,
    CollaborateurService,
    EcoleService,
    AdresseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
