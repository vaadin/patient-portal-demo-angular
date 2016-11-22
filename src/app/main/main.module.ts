import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainRoutingModule} from "./main-routing.module";
import {AnalyticsModule} from "./analytics/analytics.module";
import {MainComponent} from "./main.component";
import {PatientsModule} from "./patients/patients.module";
import {PatientsService} from "./patients/patients.service";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PatientsModule,
    AnalyticsModule
  ]
})
export class MainModule {
}

