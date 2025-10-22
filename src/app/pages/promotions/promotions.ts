import { Component } from '@angular/core';
import { Wheel } from '@app/components/wheel/wheel.component';
import { Leaderboard } from '@app/components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-promotions',
  imports: [Wheel, Leaderboard],
  templateUrl: './promotions.html',
  styleUrl: './promotions.css',
})
export class Promotions {}
