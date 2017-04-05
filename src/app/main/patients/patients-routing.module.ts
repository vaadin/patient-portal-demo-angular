import { RouterModule } from '@angular/router';
import { PATIENT_DETAIL_ROUTES } from './detail/patient-detail.routes';
import { PatientsComponent } from './patients.component';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PatientsComponent,
        children: PATIENT_DETAIL_ROUTES
      }
    ])
  ],
  exports: [RouterModule]
})
export class PatientsRoutingModule {
}

