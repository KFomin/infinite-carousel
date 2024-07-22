import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {OfferService} from "./service/offer.service";
import {InfiniteCarouselComponent} from "./components/infinite-carousel/infinite-carousel.component";
import {IOffer} from "./data/IOffer";
import {ISlide} from "./data/ISlide";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InfiniteCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private offerService: OfferService) {
  }

  carouselSlides: Promise<ISlide[]> =
    this.offerService.getOffers().then((offers: IOffer[]) => {
      return offers.map((offer: IOffer): ISlide => {
        return this.offerService.toSlideData(offer)
      });
    });
}
