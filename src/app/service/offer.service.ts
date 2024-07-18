import {Injectable} from '@angular/core';
import {IOffer} from "../data/IOffer";
import {offers} from "../test-data/offers";
import {ISlide} from "../data/ISlide";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  getOffers(): Promise<IOffer[]> {
    /* API call with delay */
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(offers);
      }, 1500);
    });
  }

  toSlideData(offer: IOffer): ISlide {
    return {
      id: offer.id,
      title: offer.title,
      description1: offer.description1,
      highlightedDescription1: offer.offer,
      description2: offer.description2,
      backgroundImage: offer.backgoundImage,
      mainImage: offer.mainImage,
      buttonLabel: offer.action,
    }
  }
}
