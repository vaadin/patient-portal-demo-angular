import {Injectable} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";

export const NARROW_WIDTH_THRESHOLD = 600;

@Injectable()
export class ResponsiveService {

  public resizeObservable = new BehaviorSubject(window.innerWidth < NARROW_WIDTH_THRESHOLD);

  constructor() {
    Observable
      .fromEvent(window, 'resize')
      .debounceTime(100)
      .map(_=> window.innerWidth < NARROW_WIDTH_THRESHOLD)
      .share()
      .subscribe(this.resizeObservable);
  }
}
