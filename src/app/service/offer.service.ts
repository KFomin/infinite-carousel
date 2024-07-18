import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from "rxjs";
import {IOffer} from "../data/IOffer";
import {offers} from "../test-data/offers";
import {HttpClient} from "@angular/common/http";

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
