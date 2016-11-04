import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class AnalyticsService {
  constructor(private http: Http){}
}
