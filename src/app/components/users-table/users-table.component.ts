import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/core/services/api.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzSpinModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchValue: string = '';
  loading = true;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Load users
    this.api.getUsers().subscribe((u) => {
      this.users = u;
      this.filteredUsers = u;
      this.loading = false;
    });

    // Debounce search
    this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((search) => {
      const s = search.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(s) ||
          user.username.toLowerCase().includes(s) ||
          user.email.toLowerCase().includes(s),
      );
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.loading = false;
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
    this.loading = false;
  }

  viewPosts(user: any) {
    this.router.navigate(['/posts'], {
      queryParams: { userId: user.id, userName: user.name },
    });
    this.loading = false;
  }
  viewTodos(user: any) {
    this.router.navigate(['/todos'], {
      queryParams: { userId: user.id, userName: user.name },
    });
    this.loading = false;
  }
}
