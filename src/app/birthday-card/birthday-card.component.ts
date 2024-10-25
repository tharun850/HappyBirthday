import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BalloonComponent } from "../balloon/balloon.component";
import { ballon } from '../interfaces/Balloon';

@Component({
  selector: 'app-birthday-card',
  standalone: true,
  imports: [NgIf, NgFor, BalloonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.css']
})
export class BirthdayCardComponent implements AfterViewInit {

  balloons: ballon[] = [];
  showMessageFlag = false;
  message = 'Wishing you a day filled with love, laughter, and all your favorite things!';

  @ViewChild('hbdImg') hbdImg!: ElementRef;
  @ViewChild('cakeImg') cakeImg!: ElementRef;

  ngAfterViewInit() {
    this.generateInitialBalloon();
    this.showHbdAndCake();
  }

  showHbdAndCake(){
    setTimeout(() => {
      this.cakeImg.nativeElement.style.display = 'none';
      this.hbdImg.nativeElement.style.display = 'block';
    }, 3000);

    setTimeout(() => {
      this.hbdImg.nativeElement.style.display = 'none';
      this.cakeImg.nativeElement.style.display = 'block';
    }, 5000);

    setTimeout(() => {
      this.balloons = [];
      this.cakeImg.nativeElement.style.top = '0%';
      this.cakeImg.nativeElement.style.bottom = 'auto';
      this.hbdImg.nativeElement.style.display = 'block';
      this.hbdImg.nativeElement.style.top = '-35%';
    }, 7000);
  }

  showMessage() {
    this.showMessageFlag = true;
  }

  balloonSize: number = 80;
  balloonColor: string = '#FFFFFF';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.generateBalloons();
  }

  generateBalloons() {
    setInterval(() => {
      let x = Math.random() * window.innerWidth;
      x = Math.round(x*1000)/1000 -40;
      const balloon = {
        size: this.balloonSize,
        color: this.balloonColor,
        x: x
      };
      if(this.balloons.length < 20)
        this.balloons.push(balloon);
    }, 500);
  }

  generateInitialBalloon() {
    for(let i=0;i<50;i++) {
      const x = i * 60;
      const balloon = {
        size: this.balloonSize,
        color: this.balloonColor,
        x: x
      };
      this.balloons.push(balloon);
    }
  }

  removeBallon(id: number){
    const index = this.balloons.findIndex((balloon) => {
      return balloon.x == id;
    });
    if (index !== -1) {
      this.balloons.splice(index, 1);
    }
  }
}