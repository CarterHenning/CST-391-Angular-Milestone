// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userId = new BehaviorSubject<number | null>(null);

  constructor() {}

  login(): void {
    this.loggedIn.next(true);
  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setUserId(id: number): void {
    this.userId.next(id);
    this.loggedIn.next(true);
  }

  getUserId(): Observable<number | null> {
    return this.userId.asObservable();
  }
}
