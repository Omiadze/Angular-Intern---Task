import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- import this

type WeekType = 'I' | 'II' | 'III' | 'IV';

interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true, // already standalone
  imports: [CommonModule], // <-- add this
  templateUrl: './leaderboard.component.html',
})
export class Leaderboard implements OnInit {
  leaderboard: LeaderboardEntry[] = [];
  filteredList: LeaderboardEntry[] = [];
  weeks: (WeekType | 'ALL')[] = ['I', 'II', 'III', 'IV', 'ALL'];
  activeFilter: WeekType | 'ALL' = 'ALL';

  ngOnInit() {
    this.generateLeaderboard();
    this.filteredList = this.leaderboard;
  }

  generateLeaderboard() {
    const weekOptions: WeekType[] = ['I', 'II', 'III', 'IV'];
    this.leaderboard = Array.from({ length: 40 }, (_, i) => ({
      customerId: Math.floor(Math.random() * 10000),
      loginName: 'user' + Math.floor(Math.random() * 1000),
      place: i + 1,
      week: weekOptions[Math.floor(Math.random() * 4)],
    }));
  }

  filterWeek(week: WeekType | 'ALL') {
    this.activeFilter = week;
    if (week === 'ALL') {
      this.filteredList = this.leaderboard;
    } else {
      this.filteredList = this.leaderboard.filter((entry) => entry.week === week);
    }
  }
}
