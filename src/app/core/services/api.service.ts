import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

// types
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  userName?: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private USERS_URL = 'https://jsonplaceholder.typicode.com/users';
  private POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USERS_URL);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.POSTS_URL);
  }

  getPostsWithUserName(): Observable<Post[]> {
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
