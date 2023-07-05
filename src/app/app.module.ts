import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { HeroesComponent } from './components/heroes/heroes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeroesGenerateCardComponent } from './components/heroes/heroes-generate-card/heroes-generate-card.component';
import { MatSelectModule } from '@angular/material/select';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SortPipe } from './pipes/sort.pipe';
import { HeroesCardComponent } from './components/heroes/heroes-card/heroes-card.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeroesGenerateCardComponent,
    HeroesComponent,
    SortPipe,
    HeroesCardComponent
  ],
  imports: [
    MatGridListModule,
    MatProgressSpinnerModule,
    ColorPickerModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
