import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  birthday = new Date(1988, 3, 15);
}
