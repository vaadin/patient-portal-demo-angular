import {Component, OnInit} from "@angular/core";
import {PatientsService} from "../patients.service";
@Component({
  template:'&nbsp;'
})
export class EmptyComponent implements OnInit{

  constructor(private service: PatientsService){
  }

  ngOnInit(): void {
    this.service.setCurrentPatient(null);
  }
}
