import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {PatientsModule} from "./patients/patients.module";
import {AnalyticsModule} from "./analytics/analytics.module";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'patients',
            loadChildren: () => PatientsModule
          }, {
            path: 'analytics',
            loadChildren: () => AnalyticsModule
          }, {
            path: '',
            redirectTo: 'patients'
          }
        ]
      }])
  ],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
