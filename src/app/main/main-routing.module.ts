import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


// https://github.com/angular/angular-cli/issues/4192
// export function patientsLoader () {
//   return PatientsModule
// }
// export function analyticsLoader () {
//   return AnalyticsModule
// }

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: 'patients',
            loadChildren: './patients/patients.module#PatientsModule'//patientsLoader
          }, {
            path: 'analytics',
            loadChildren: './analytics/analytics.module#AnalyticsModule'//analyticsLoader
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
