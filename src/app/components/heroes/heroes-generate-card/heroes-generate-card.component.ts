import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HeroesService } from '../../../services/heroes.service';
import { catchError, of, tap } from 'rxjs';
import { AbilityOptions } from 'src/app/interfaces/hero.interface';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-heroes-generate-card',
  templateUrl: './heroes-generate-card.component.html',
  styleUrls: ['./heroes-generate-card.component.scss']
})
export class HeroesGenerateCardComponent {

  submittedInProgress = false;
  suitColor: string = '#000000';
  heroesCardForm: FormGroup;
  abilityOptions: AbilityOptions[] = Object.values(AbilityOptions);

  constructor(
    public dialogRef: MatDialogRef<HeroesGenerateCardComponent>,
    private heroesService: HeroesService, private notificationService: NotificationService) {
    dialogRef.disableClose = true;
    this.heroesCardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      ability: new FormControl('', [Validators.required]),
      suitColor: new FormControl('', [Validators.required]),
      startingPower: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }
  
  public colorPickerChange(color: string): void {
    this.heroesCardForm.controls.suitColor.setValue(color);
  }

  submitCard() {
    this.submittedInProgress = true;
    this.heroesService.addCard(this.heroesCardForm.value).pipe(
      tap(data => this.dialogRef.close(data)),
      catchError(error => {
        this.notificationService.error(error);
        return of()
      })
      ).subscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
