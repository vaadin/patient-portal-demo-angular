import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {JournalEditComponent} from "./detail/journal/journal-edit.component";
import {PatientsService} from "./patients.service";
import {PatientsComponent} from "./patients.component";
import {JournalComponent} from "./detail/journal/journal.component";
import {ProfileEditComponent} from "./detail/profile/profile-edit.component";
import {ProfileComponent} from "./detail/profile/profile.component";
import {PatientDetailComponent} from "./detail/patient-detail.component";
import {EmptyComponent} from "./detail/empty.component";
import {PatientsRoutingModule} from "./patients-routing.module";
import {PatientDetailsService} from "./detail/patient-detail.service";
import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule,
    GridModule
  ],
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    ProfileComponent,
    ProfileEditComponent,
    JournalComponent,
    JournalEditComponent,
    PatientDetailComponent,
    EmptyComponent
  ],
  providers: [
    PatientsService,
    PatientDetailsService
  ]
})
export class PatientsModule {
}
