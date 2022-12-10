import {Component} from '@angular/core';
import {Message} from "primeng/api";
import {AuthenticationService} from "./service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supportportalapp';

  constructor() {
  }

}
