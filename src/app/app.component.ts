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
      this.carouselData = offers.map((offer: IOffer) => {
        return {
          id: offer.id,
          title: offer.title,
          description1: offer.description1,
          highlightedDescription1: offer.offer,
          description2: offer.description2,
          backgroundImage: offer.backgoundImage,
          mainImage: offer.mainImage,
        }
      });
    })
  }

  title = 'carousel';
}
