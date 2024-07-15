import {Component, OnInit} from '@angular/core';
import {IOffer} from "../../data/IOffer";
import {OfferService} from "../../service/offer.service";
import {NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {interval, Observable} from "rxjs";
import {offers} from "../../test-data/offers";

@Component({
  selector: 'app-infinite-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './infinite-carousel.component.html',
  styleUrl: './infinite-carousel.component.scss'
})
export class InfiniteCarouselComponent implements OnInit {
  offers: IOffer[] = [];
  currentOfferIndex: number = 0;
  autoSlideInterval: Observable<number> = interval(10000);

  constructor(private offerService: OfferService) {
  }


  ngOnInit(): void {

    this.autoSlideInterval.subscribe(() => {
        if (offers[this.currentOfferIndex+1]) {
          this.currentOfferIndex = this.currentOfferIndex+1;
        } else {
          this.currentOfferIndex = 0;
        }
    });

    this.offerService.getData().subscribe(data => this.offers = data);
  }
}
