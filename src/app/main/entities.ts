export enum Gender {
  MALE, FEMALE
}

export const AppointmentTypes = [
  'NEW_PATIENT', 'X_RAY', 'SURGERY', 'FOLLOW_UP'
];

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  patients?: Patient[];
}

export class JournalEntry {
  date: Date;
  appointmentType: string;
  entry: string;
  doctor: Doctor;
}

export class Patient {
  public medicalRecord: number;
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public gender: Gender;
  public lastEntry: Date;
  public birthDate: Date;
  public doctor: Doctor;
  public ssn: string;
  public pictureUrl: string;
  public journalEntries?: JournalEntry[];
}
