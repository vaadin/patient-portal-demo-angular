import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


export interface ChartData {
  grouping: string;
  data: Object[];
}

@Injectable()
export class AnalyticsService {

  constructor(private http: Http) {
  }



  getAnalytics(grouping = 'age'): Observable<ChartData> {
    return this.http
      .get(`${environment.API_URL}/analytics/${grouping}`)
      .map(res => res.json());
  }
}
