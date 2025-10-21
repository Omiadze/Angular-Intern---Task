import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from '@app/core/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzModalModule, NzSpinModule],
  providers: [NzModalService],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: any[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private modal: NzModalService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['userId'];
    this.api.getPostsWithUserName().subscribe((posts) => {
      this.posts = userId ? posts.filter((p) => p.userId === +userId) : posts;
      this.loading = false;
    });
  }

  openDetails(post: any): void {
    this.modal.info({
      nzTitle: post.title,
      nzContent: post.body,
      nzOkText: 'Close',
    });
  }
}
