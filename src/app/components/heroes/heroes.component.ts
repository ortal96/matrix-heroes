import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroesGenerateCardComponent } from './heroes-generate-card/heroes-generate-card.component';
import { IHero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public heroesCards$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);

  loading = true;

  constructor(
    private dialog: MatDialog,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getCards().subscribe(cards => {
      this.heroesCards$.next(cards);
      this.loading = false;
    })
  }

  createHero(): void {
    const dialogRef = this.dialog.open(HeroesGenerateCardComponent, {});
    dialogRef.afterClosed().subscribe(heroCard => {
      if (!heroCard) return;
      this.heroesCards$.next([ ...this.heroesCards$.getValue(), heroCard])
    });
  }

}
