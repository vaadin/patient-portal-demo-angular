import {Component} from "@angular/core";

@Component({
  template: `<chart [options]="options"></chart>`
})
export class AnalyticsComponent {
  options: Object;
  constructor() {
    this.options = {
      title : { text : 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }
}
