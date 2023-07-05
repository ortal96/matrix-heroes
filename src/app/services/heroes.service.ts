import { Injectable } from '@angular/core';
import { IHero } from '../interfaces/hero.interface';
import * as uuid from 'uuid';
import { Observable, delay, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService} from './notification.service';
@Injectable({
    providedIn: 'root',
})
export class HeroesService {
    constructor(private authService: AuthService, private notificationService: NotificationService) {}

    public addCard(card: Omit<IHero, 'id'>): Observable<IHero> {
        const heroesCards: IHero[] = this.getHeroes();
        const user = this.authService.getUser();
        if (!user) {
          return throwError(() => 'No user logged in');
        }
        const heroesCard: IHero = {
            ...card,
            trainerId: user.id,
            id: uuid.v4(),
            currentPower: card.startingPower,
            trainings: []
        }
        heroesCards.push(heroesCard);
        this.setHeroes(heroesCards)
        return of(heroesCard).pipe(delay(1000));
    }

    public trainHero(heroCard: IHero): Observable<number> {
        const heroesCards: IHero[] = this.getHeroes()
        const storeHeroCard = heroesCards.find(({ id }) => id === heroCard.id);
        if (!storeHeroCard) {
          return throwError(() => 'Hero not found');
        }
        const trainingsToday = storeHeroCard.trainings.filter(date =>
          this.getDateString(date) === this.getDateString(new Date()));
        if(trainingsToday.length >= 5) {
          this.notificationService.error('Cant train');
          return of(storeHeroCard.currentPower);
        }
        storeHeroCard.trainings.push(new Date());
        storeHeroCard.currentPower += this.calcPowerToAdd(storeHeroCard.currentPower);

        this.setHeroes(heroesCards);
        return of(storeHeroCard.currentPower).pipe(delay(1000));
    }

    private calcPowerToAdd(currentPower: number): number {
      const maxAddCurrentPower = currentPower * 0.1;
      return Math.floor(Math.random() * (maxAddCurrentPower + 1));
    }

    public getCards(): Observable<IHero[]> {
        const heroesCards: IHero[] = this.getHeroes();
        const user = this.authService.getUser();
        return of(heroesCards.filter(({ trainerId }) => trainerId === user!.id)).pipe(delay(1000));
    }

    private getDateString(date: Date | string): string {
      date = new Date(date);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    private getHeroes(): IHero[] {
      return JSON.parse(localStorage.getItem('heroesCards') || '[]') as IHero[];
    }

    private setHeroes(heroes: IHero[]): void {
      localStorage.setItem('heroesCards', JSON.stringify(heroes));
    }

}
