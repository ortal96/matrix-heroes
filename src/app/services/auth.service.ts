import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import * as uuid from 'uuid';
import { IUser } from '../interfaces/user.interface';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: IUser | undefined;
    constructor() { }

    isUserLoggedIn(): boolean {
        if (this.user) {
            return true;
        }
        const user = localStorage.getItem('currentUser');
        this.user = user ? JSON.parse(user) : undefined;
        return !!user;
    }

    getUser(): IUser | undefined {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            return;
        }
        return JSON.parse(user);
    }


    login(email: string, password: string): Observable<IUser> {
        const users: IUser[] = this.getUsers();
        const user = users.find((user: IUser) =>
            user.email === email && user.password === password);

        if (!user) {
            return throwError(() => 'Invalid email or password').pipe(delay(1000));
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.user = user;

        return of(user).pipe(delay(1000))
    }

    signUp(userData: Omit<IUser, 'id'>): Observable<{success: boolean}> {
        const users: IUser[] = this.getUsers();
        const alreadyExists = users.some((user: IUser) =>
            user.email === userData.email);

        if (alreadyExists) {
            return throwError(() => 'Email already exists').pipe(delay(1000));
        }
        users.push({ ...userData, id: uuid.v4() });
        this.setUsers(users);
        return of({ success: true }).pipe(delay(1000));
    }

    getUsers(): IUser[] {
      return JSON.parse(localStorage.getItem('users') || '[]');
    }

    setUsers(users: IUser[]): void {
      localStorage.setItem('users', JSON.stringify(users));
    }
}
