import {Component, OnInit} from '@angular/core';
import {JournalService} from "./journal.service";
import {Router} from "@angular/router";
import {JournalEntry, Doctor, Patient, AppointmentTypes} from "../../../entities";
import {NgForm} from "@angular/forms";
import {PatientsService} from "../../patients.service";
import {PlatformLocation} from "@angular/common";

@Component({
  selector: 'app-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.css']
})
export class JournalEditComponent implements OnInit {

  entry: JournalEntry;
  doctors: Doctor[];
  patient: Patient;
  types: string[] = AppointmentTypes;

  constructor(private journalService: JournalService,
              private patientsService: PatientsService,
              private router: Router,
              private location: PlatformLocation) {
  }

  ngOnInit() {
    this.entry = new JournalEntry();
    this.entry.date = new Date();
    this.patientsService.currentPatient.subscribe(
      patient => this.patient = patient
    );
    this.patientsService.getDoctors().subscribe(
      doctors => this.doctors = doctors
    );
  }


  save(form: NgForm){
    this.journalService.addJournalEntry(form.value);
    this.location.back();

  }

}
