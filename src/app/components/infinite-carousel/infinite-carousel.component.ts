import {Component, OnInit} from '@angular/core';
import {IOffer} from "../../data/IOffer";
import {OfferService} from "../../service/offer.service";
import {NgClass, NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {interval, Observable, skip, take, takeUntil} from "rxjs";
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
  offers: IOffer[] = [];
  movingRight: boolean = false;
  movingLeft: boolean = false;
  autoSlideInterval: Observable<number> = interval(3000);

  constructor(private offerService: OfferService) {
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
      }, 1000);
    }
  }


  moveLeft: () => void = () => {
    if (!this.movingRight && !this.movingLeft) {
      this.movingLeft = true;
      setTimeout(() => {
        let lastOffer = this.offers.pop();
        if (lastOffer !== undefined) {
          this.offers.unshift(lastOffer);
        }
        this.movingLeft = false;
      }, 1000);
    }
  }


  ngOnInit(): void {
    this.autoSlideInterval.subscribe(() => {
      this.moveRight();
    });
    this.offerService.getData().subscribe(data => this.offers = data);
  }
}
