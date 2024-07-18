import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from "rxjs";
import {IOffer} from "../data/IOffer";
import {offers} from "../test-data/offers";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  getData(): Observable<IOffer[]> {
    return of(offers).pipe(
      delay(3000),
      map((a) => {
        return a
      })
    );
  }
}
