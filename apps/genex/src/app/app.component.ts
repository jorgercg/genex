import { Component } from '@angular/core';
import { environment } from '../envs/environment.dev';

@Component({
  selector: 'genex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = environment.appTitle;
}
