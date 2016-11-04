import {NgModule} from "@angular/core";
import {ChartModule} from "angular2-highcharts";
import {AnalyticsComponent} from "./analytics.component";
import {AnalyticsRoutingModule} from "./analytics-routing.module";

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [AnalyticsRoutingModule, ChartModule],
  providers: []
})
export class AnalyticsModule {
}
