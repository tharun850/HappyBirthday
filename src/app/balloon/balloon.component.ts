import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-balloon',
  standalone: true,
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.css']
})
export class BalloonComponent {
  @Input() size!: number;
  @Input() color!: string;
  @Input() x!: number;
  @Output() deleteBalloon = new EventEmitter<number>();
  balloonSvg!: SafeHtml;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private elementRef: ElementRef) { }

  ngOnInit() {
    this.http.get('../assets/output.svg', { responseType: 'text' }).subscribe(svg => {
      this.balloonSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.left = `${this.x}px`;
    this.elementRef.nativeElement.style.bottom = '0px';
    this.elementRef.nativeElement.style.position = 'absolute';
  }

  popBalloon() {
    let x = this.elementRef.nativeElement.style.left;
    this.deleteBalloon.emit(+x.split('px')[0]);
    this.elementRef.nativeElement.classList.add('popped');
    setTimeout(() => {
      this.elementRef.nativeElement.remove();
    }, 200);
  }



}