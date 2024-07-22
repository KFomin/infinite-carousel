import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {SlideComponent} from "./slide/slide.component";
import {ISlide} from "../../data/ISlide";

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

  @Input({required: true}) slides!: ISlide[];

  /* track left/right moving animations */
  movingRight: boolean = false;
  movingLeft: boolean = false;

  /* fire carousel move event every 10 seconds */
  autoSlideInterval = setInterval(() => {
    this.moveLeft()
  }, 10000)


  ngOnInit(): void {
    /* Keep number of slides not lesser than 3 */
    /* To simulate infinite carousel even if there's 1 or 2 slides */
    /* Nothing will display if there's 0 slides */
    if (this.slides.length == 1) {
      this.slides.push(this.slides[0], this.slides[0]);
    }
    if (this.slides.length == 2) {
      this.slides.push(this.slides[0]);
    }
  }

  /* reset interval state */
  resetAutoSlideInterval: () => void = () => {
    clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = setInterval(() => {
      this.moveLeft()
    }, 10000);
  }

  /* carousel controllers */
  moveLeft: () => void = () => {
    if (!this.movingRight && !this.movingLeft) {
      /* start animation */
      this.movingRight = true;

      setTimeout(() => {
        /* stop animation */
        this.movingRight = false;

        /* move slides in array */
        /* first slide goes into the end*/
        let firstSlide = this.slides.shift();
        if (firstSlide !== undefined) {
          this.slides.push(firstSlide);
        }

        /* reset interval state to avoid double scrolls */
        this.resetAutoSlideInterval()
      }, 1000);
    }
  }

  moveRight: () => void = () => {
    if (!this.movingRight && !this.movingLeft) {
      /* start animation */
      this.movingLeft = true;

      setTimeout(() => {
        /* stop animation */
        this.movingLeft = false;

        /* move slides in array */
        /* last slide goes into beginning*/
        let lastSlide = this.slides.pop();

        if (lastSlide !== undefined) {
          this.slides.unshift(lastSlide);
        }

        /* reset interval state to avoid double scrolls */
        this.resetAutoSlideInterval()
      }, 1000);
    }
  }

  /* Handle swipe event */
  /* coordinates to track touch locations during swipe */
  startX: number = 0;
  startY: number = 0;

  onTouchStart(evt: TouchEvent) {

    /* Horizontal coordinates of starting point */
    this.startX = evt.touches[0].clientX;

    /* Vertical coordinates of starting point */
    this.startY = evt.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    /* Current point of swipe */
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    /* Calculate swipe direction */
    const diffX = currentX - this.startX;
    const diffY = currentY - this.startY;

    if (Math.abs(diffX) > (Math.abs(diffY) - 25)) {
      /* prevent default scrolling if horizontal swipe detected */
      event.preventDefault();
    }
  }

  onTouchEnd(event: TouchEvent) {

    /* swipe sensitivity */
    const threshold = 50;

    /* fire slider event only if swipe was long enough */
    if (Math.abs(this.startX - event.changedTouches[0].clientX) > threshold) {
      if (this.startX - event.changedTouches[0].clientX > 0) {
        this.moveLeft()
      } else {
        this.moveRight()
      }
    }

  }

  sliderButtonClicked(sliderButtonData: string) {
    console.log(sliderButtonData);
  }

}
