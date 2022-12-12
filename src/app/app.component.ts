import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  first,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  take,
} from 'rxjs';
import {Person} from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-adv';

  // `Observable` type which emits `number` data streams
  observable: Observable<any>;
  subscription: Subscription;
  secondSubscription: Subscription;
  mySubject = new Subject<string>();

  behaviorSubject = new BehaviorSubject<Person>({
    firstName: 'Adam',
    lastName: 'Young',
    age: 34,
  });

  ngOnInit(): void {
    // initializing an observable
    this.observable = new Observable((subscriber) => {
      // emitting next value
      subscriber.next(101);
      // emitting value 5 after 5 seconds
      setTimeout(() => subscriber.next(5), 5000);
      subscriber.next(1);
      setTimeout(() => {
        // after 7 seconds emitting value 66
        subscriber.next(66);
        subscriber.next('Completing now...');
        // after 7 seconds completing the observable meaning observable is done emitting the value
        // subscriber.complete();
        subscriber.error('Unhandled Error..!');
        subscriber.next('After complete()');
      }, 7000);
    });

    // this.subscription = this.observable.subscribe(value => {
    //   // by default next() is used
    //   console.log(value);
    // });

    // this.subscription = this.observable.pipe(
    //     // map(x => x * 2),
    //     // filter(x => x % 2 == 0),
    //     // take(3)
    //     // first()
    //   ).subscribe(val => console.log(val));
    //
    // this.secondSubscription = this.observable.subscribe(val => console.log(`From second subscription ${val}`));

    this.listenMySubject();
    this.emitMySubject();

    // this.behaviorSubject.next('modifiedValue');

    console.log(
      `From Behavior Subject ${JSON.stringify(this.behaviorSubject.value)}`
    );
  }

  emitMySubject(): void {
    this.mySubject.next('firstValue');
    setTimeout(() => this.mySubject.next('Value after 5 seconds'), 5000);
  }

  listenMySubject(): void {
    this.mySubject.subscribe((val) => console.log(`First: ${val}`));

    setTimeout(
      () => this.mySubject.subscribe((val) => console.log(`Second: ${val}`)),
      2000
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.secondSubscription.unsubscribe();
  }
}
