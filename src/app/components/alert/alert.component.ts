import { Component } from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})

export class AlertComponent {
  constructor(public gameService:GameService) {

  }

}
