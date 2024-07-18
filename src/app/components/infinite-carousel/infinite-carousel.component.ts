import {Component, Input} from '@angular/core';
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
export class InfiniteCarouselComponent {
  @Input({required: true}) slides!: ISlide[];

  sliderButtonClicked(sliderButtonData: string) {
    console.log(sliderButtonData);
  }

  /* track left/right moving animations */
  movingRight: boolean = false;
  movingLeft: boolean = false;


  /* fire carousel move event every 10 seconds */
  interval = setInterval(() => {
    this.moveRight()
  }, 10000)

  /* reset interval state */
  resetInterval: () => void = () => {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.moveRight()
    }, 10000);
  }

  /* carousel controllers */
  moveRight: () => void = () => {
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
        this.resetInterval()
      }, 1000);
    }
  }

  moveLeft: () => void = () => {
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
        this.resetInterval()
      }, 1000);
    }
  }

  /* Handle swipe event */

  /* coordinates to handle swipe event */
  startX: number = 0;
  startY: number = 0;

  touchStarted(evt: TouchEvent) {

    /* Horizontal coordinates of starting point */
    this.startX = evt.touches[0].clientX;

    /* Vertical coordinates of starting point */
    this.startY = evt.touches[0].clientY;
  }

  touchMoved(event: TouchEvent) {
    /* Current point of swipe */
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    /* Calculat swipe direction */
    const diffX = currentX - this.startX;
    const diffY = currentY - this.startY;

    if (Math.abs(diffX) > (Math.abs(diffY) - 25)) {
      /* prevent default scrolling if horizontal swipe detected */
      event.preventDefault();
    }
  }

  touchEnded(event: TouchEvent) {

    /* swipe sensitivity */
    const threshold = 50;

    /* fire slider event only if swipe was long enough */
    if (Math.abs(this.startX - event.changedTouches[0].clientX) > threshold) {
      if (this.startX - event.changedTouches[0].clientX > 0) {
        this.moveRight()
      } else {
        this.moveLeft()
      }
    }

  }

}
