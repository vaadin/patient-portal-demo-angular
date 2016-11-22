import {RouterModule} from "@angular/router";
import {AnalyticsComponent} from "./analytics.component";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ':grouping',
        component: AnalyticsComponent
      }, {
        path: '',
        redirectTo: 'age'
      }
    ])
  ],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule {
}
