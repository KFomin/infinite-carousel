import {Injectable} from '@angular/core';
import {IOffer} from "../data/IOffer";
import {offers} from "../test-data/offers";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  getData(): Promise<IOffer[]> {
    /* API call with delay */
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(offers);
      }, 1500);
    });
  }
}
