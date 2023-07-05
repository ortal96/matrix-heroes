import { Component, Input } from '@angular/core';
import { IHero } from '../../../interfaces/hero.interface';
import { HeroesService } from '../../../services/heroes.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-heroes-card',
  templateUrl: './heroes-card.component.html',
  styleUrls: ['./heroes-card.component.scss']
})
export class HeroesCardComponent {

  @Input() heroCard!: IHero;
  submittedInProgress = false;
  errorMassage = '';

  constructor(private heroesService: HeroesService, private notificationService: NotificationService) {

  }

  trainHero() {
    this.submittedInProgress = true;
    this.heroesService.trainHero(this.heroCard).pipe(
      tap(currentPower => {
        this.heroCard.currentPower = currentPower;
      }),
      catchError(error => {
        this.errorMassage = error;
        this.notificationService.error(this.errorMassage)
        return of()
      }),
      finalize(() => {
        this.submittedInProgress = false;
      })
    ).subscribe();
  }



}
