import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {AppConfiguration} from "../../app-configuration.service";
import {Observable} from "rxjs";


export interface ChartData {
  grouping: string;
  data: Object[];
}

@Injectable()
export class AnalyticsService {

  constructor(private http: Http,
              private config: AppConfiguration) {
  }



  getAnalytics(grouping: string = 'age'): Observable<ChartData> {
    return this.http
      .get(`${this.config.API_URL}/analytics/${grouping}`)
      .map(res=>res.json());
  }
}
