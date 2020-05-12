import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {

  displayImages = [false, true, true];
  private currentIndex = 0;
  private intervalId = setInterval(() => this.carousel(), 3000);

  ngOnInit() {
  }

  carousel() {
      this.displayImages[this.currentIndex++] = true;
      if(this.currentIndex === 3) {
        this.currentIndex = 0;
      }
      this.displayImages[this.currentIndex] = false;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
