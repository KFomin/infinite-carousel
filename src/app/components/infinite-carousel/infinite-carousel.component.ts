import {Component, OnInit} from '@angular/core';
import {IOffer} from "../../data/IOffer";
import {OfferService} from "../../service/offer.service";
import {NgForOf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";

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

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getData().subscribe(data => this.offers = data);
  }
}
