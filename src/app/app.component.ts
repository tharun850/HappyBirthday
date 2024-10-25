import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirthdayCardComponent } from './birthday-card/birthday-card.component';
import { HttpClientModule } from '@angular/common/http';
import { BalloonComponent } from './balloon/balloon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterOutlet, BirthdayCardComponent, BalloonComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'happyBirthday';
}
