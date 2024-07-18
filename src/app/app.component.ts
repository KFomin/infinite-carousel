import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {OfferService} from "./service/offer.service";
import {InfiniteCarouselComponent} from "./components/infinite-carousel/infinite-carousel.component";
import {IOffer} from "./data/IOffer";
import {ISlide} from "./data/ISlide";
import {of} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InfiniteCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private offerService: OfferService) {
  }

  carouselData: ISlide[] = []
  loading: boolean = true;

  ngOnInit(): void {
    this.offerService.getOffers().then((offers: IOffer[]) => {
      this.loading = false
      this.carouselData = offers.map((offer: IOffer): ISlide => {
        return this.offerService.toSlideData(offer)
      });
    })
  }

  title = 'carousel';
}
