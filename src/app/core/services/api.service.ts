import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private USERS_URL = 'https://jsonplaceholder.typicode.com/users';
  private POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.USERS_URL);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.POSTS_URL);
  }

  // Get posts with user name
  getPostsWithUserName(): Observable<any[]> {
    return forkJoin({
      users: this.getUsers(),
      posts: this.getPosts(),
    }).pipe(
      map(({ users, posts }) =>
        posts.map((post) => ({
          ...post,
          userName: users.find((u) => u.id === post.userId)?.name || 'Unknown',
        })),
      ),
    );
  }

  getTodosByUserId(userId: string) {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  }
}
