import {Component, OnInit} from '@angular/core';
import {IOffer} from "../../data/IOffer";
import {OfferService} from "../../service/offer.service";
import {NgClass, NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {SlideComponent} from "../slide/slide.component";

@Component({
  selector: 'app-infinite-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    SlideComponent,
    NgClass
  ],
  templateUrl: './infinite-carousel.component.html',
  styleUrl: './infinite-carousel.component.scss'
})
export class InfiniteCarouselComponent implements OnInit {
  constructor(private offerService: OfferService) {
  }

  offers: IOffer[] = [];
  movingRight: boolean = false;
  movingLeft: boolean = false;

  /* coordinates for swipe handling */
  startX: number = 0;
  startY: number = 0;

  ngOnInit(): void {
    this.offerService.getData().subscribe(data => this.offers = data);
  }

  interval = setInterval(() => {
    this.moveRight()
  }, 10000)

  pauseInterval: () => void = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.moveRight()
    }, 10000);
  }

  touchStarted(evt: TouchEvent) {
    this.startX = evt.touches[0].clientX;
    this.startY = evt.touches[0].clientY;
  }

  touchMoved(event: TouchEvent) {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const diffX = currentX - this.startX;
    const diffY = currentY - this.startY;

    if (Math.abs(diffX) > (Math.abs(diffY)-25)) {
      /* prevent default scrolling if horizontal swipe detected */
      event.preventDefault();
    }
  }

  touchEnded(event: TouchEvent) {
    /* swipe sensitivity */
    const threshold = 50;

    if (Math.abs(this.startX - event.changedTouches[0].clientX) > threshold) {
      if (this.startX - event.changedTouches[0].clientX > 0) {
        this.moveRight()
      } else {
        this.moveLeft()
      }
    }
  }

  moveRight: () => void = () => {
    if (!this.movingRight && !this.movingLeft) {
      this.movingRight = true;
      setTimeout(() => {
        this.movingRight = false;
        let firstOffer = this.offers.shift();
        if (firstOffer !== undefined) {
          this.offers.push(firstOffer);
        }
        this.pauseInterval()
      }, 1000);
    }
  }

  moveLeft: () => void = () => {
    if (!this.movingRight && !this.movingLeft) {
      this.movingLeft = true;
      setTimeout(() => {
        this.movingLeft = false;
        let lastOffer = this.offers.pop();
        if (lastOffer !== undefined) {
          this.offers.unshift(lastOffer);
        }
        this.pauseInterval()
      }, 1000);
    }
  }

}
