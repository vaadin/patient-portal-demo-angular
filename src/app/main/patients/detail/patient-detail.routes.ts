import {Routes} from "@angular/router";
import {JournalEditComponent} from "./journal/journal-edit.component";
import {JournalComponent} from "./journal/journal.component";
import {ProfileEditComponent} from "./profile/profile-edit.component";
import {ProfileComponent} from "./profile/profile.component";
import {PatientDetailComponent} from "./patient-detail.component";
import {EmptyComponent} from "./empty.component";

export const PATIENT_DETAIL_ROUTES: Routes = [
  {
    path: 'new',
    component: ProfileEditComponent
  }, {
    path: ':id',
    component: PatientDetailComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      }, {
        path: 'profile/edit',
        component: ProfileEditComponent
      }, {
        path: 'journal',
        component: JournalComponent
      }, {
        path: 'journal/new',
        component: JournalEditComponent
      }, {
        path: '',
        redirectTo: 'profile'
      }
    ]
  }, {
    path: '',
    component: EmptyComponent
  }
];
