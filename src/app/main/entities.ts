export enum Gender {
  MALE, FEMALE
}

export enum AppointmentType {
  NEW_PATIENT, X_RAY, SURGERY, FOLLOW_UP
}

export class Doctor {
  constructor(public firstName: string,
              public lastName: string,
              public patients?: Patient[]){}

  get name(): string {
    return `${this.lastName}, ${this.firstName}`;
  }

}

export class JournalEntry {
  constructor(
    public date: Date,
    public appointmentType: AppointmentType,
    public entry: string
  ){}

}

export class Patient {
  constructor(
    public medicalRecord?: number,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public gender?: Gender,
    public lastEntry?: Date,
    public birthDate?: Date,
    public doctor?: Doctor,
    public journalEntries?: JournalEntry[]
  ){}

  get name(): string {
    return `${this.lastName}, ${this.firstName}`;
  }
}

export class Page {
  constructor(
    public size: number,
    public totalElements: number,
    public totalPages: number,
    public number: number
  ){}
}

export class PatientsResult {
  constructor(
    public page: Page,
    public patients: Patient[]
  ){}
}
