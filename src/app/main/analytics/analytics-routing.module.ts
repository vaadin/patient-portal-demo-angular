import {RouterModule} from "@angular/router";
import {AnalyticsComponent} from "./analytics.component";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AnalyticsComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule {
}
