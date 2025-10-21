import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ApiService } from '@app/core/services/api.service';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzSpinModule, NzTagModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  userName = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    this.userName = this.route.snapshot.queryParamMap.get('userName') || '';

    if (userId) {
      this.api.getTodosByUserId(userId).subscribe({
        next: (data) => {
          this.todos = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
    }
  }
}
