import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {PatientsModule} from "./patients/patients.module";
import {AnalyticsModule} from "./analytics/analytics.module";


export function patientsLoader () {
  return PatientsModule
}
export function analyticsLoader () {
  return AnalyticsModule
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'patients',
            loadChildren: patientsLoader
          }, {
            path: 'analytics',
            loadChildren: analyticsLoader
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
