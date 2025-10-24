import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

type WeekType = 'I' | 'II' | 'III' | 'IV';

interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
  avatarUrl: string;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzTableModule, NzAvatarModule],
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

  // generate the DiceBear URL
  private generateAvatarUrl(seed: string): string {
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&size=32`;
  }

  generateLeaderboard() {
    const weekOptions: WeekType[] = ['I', 'II', 'III', 'IV'];
    this.leaderboard = Array.from({ length: 40 }, (_, i) => {
      const loginName = 'user' + Math.floor(Math.random() * 1000) + (i < 10 ? 'a' : 'b');

      return {
        customerId: Math.floor(Math.random() * 10000),
        loginName: loginName,
        place: i + 1,
        week: weekOptions[Math.floor(Math.random() * 4)],
        avatarUrl: this.generateAvatarUrl(loginName),
      };
    });
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
