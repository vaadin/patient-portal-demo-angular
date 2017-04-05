import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from './analytics.service';
import { ChartsModule } from '@progress/kendo-angular-charts';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule
  ],
  declarations: [
    AnalyticsComponent
  ],
  providers: [
    AnalyticsService
  ]
})
export class AnalyticsModule {
}
