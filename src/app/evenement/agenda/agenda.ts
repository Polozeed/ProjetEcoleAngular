import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth, isToday, parseISO} from 'date-fns';
import {Subject, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {EvenementService} from '../service/evenement.service';
import {Evenement} from '../../models/Evenement.model';
import {Router} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localefr from '@angular/common/locales/fr';

registerLocaleData(localefr);


const colors: any = {
  red: {
    primary: '#ad2121',
  },
  blue: {
    primary: '#1e90ff',
  },
  yellow: {
    primary: '#e3bc08',
  },
  green: {
    primary: '#008000',
  }
};

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'agenda-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda.css'],
  templateUrl: './agenda.html'
})
export class AgendaComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  calendarEvents: CalendarEvent[] = [];
  eventSubscription: Subscription;
  activeDayIsOpen = true;
  private EventColor: any;

  constructor(private modal: NgbModal,
              private router: Router,
              private eventService: EvenementService) {
  }

  ngOnInit() {
    this.convEventToEventCalendar();
    // @ts-ignore
    this.dayClicked(isToday());
  }

  convEventToEventCalendar() {
    this.eventService
      .getAllEvents()
      .subscribe(evenements => {
        this.calendarEvents = evenements.map(evt => {
          return {
            start: parseISO(evt.horaireDebut.toString()),
            end: parseISO(evt.horaireFin.toString()),
            title: evt.intitule,
            color: this.getColorEvent(evt),
          };
        });
      });
  }

  getColorEvent(event: Evenement) {
    let color;
    if (event.couleur === 'green') {
      return color = colors.green;
    }
    if (event.couleur === 'yellow') {
      return color = colors.yellow;
    }
    if (event.couleur === 'red') {
      return color = colors.red;
    } else {
      return color = colors.blue;
    }
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.calendarEvents = this.calendarEvents.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.router.navigate(['/event/' + event.title]);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


}
