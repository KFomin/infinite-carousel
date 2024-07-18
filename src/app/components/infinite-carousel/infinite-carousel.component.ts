import {Component, OnInit} from '@angular/core';
import {IOffer} from "../../data/IOffer";
import {OfferService} from "../../service/offer.service";
import {NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {interval, Observable} from "rxjs";
import {SlideComponent} from "../slide/slide.component";

@Component({
  selector: 'app-infinite-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    SlideComponent
  ],
  templateUrl: './infinite-carousel.component.html',
  styleUrl: './infinite-carousel.component.scss'
})
export class InfiniteCarouselComponent implements OnInit {
  offers: IOffer[] = [];

  autoSlideInterval: Observable<number> = interval(1500);

  constructor(private offerService: OfferService) {
  }


  ngOnInit(): void {

    this.autoSlideInterval.subscribe(() => {
      let firstOffer = this.offers.shift();
      if (firstOffer !== undefined) {
        this.offers.push(firstOffer);
      }
    });

    this.offerService.getData().subscribe(data => this.offers = data);
  }
}
