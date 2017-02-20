import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AnalyticsService} from "./analytics.service";
import 'hammerjs';

@Component({
  templateUrl: 'analytics.component.html',
  styleUrls: ['analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  protected options: Object = {};
  private chartSeries;
  private chartCategories;
  private grouping;

  constructor(private route: ActivatedRoute,
              private service: AnalyticsService) {
  }

  ngOnInit(): void {
    const chartData = this.route.params
      .filter(p => p.hasOwnProperty('grouping'))
      .map(p => p['grouping'])
      .flatMap(grouping => this.service.getAnalytics(grouping))
      .map(this.setChartOptions)
      .share();

    this.chartSeries = chartData.map(data => data.map(point => point.value));
    this.chartCategories = chartData.map(data => data.map(point => point.category));
  }

  setChartOptions(chartData) {
    function byAge() {
      const sorted = chartData.data.sort((a, b) => {
        if (a.age.charAt(0) === 'U') {
          return -1
        } else if (a.age.charAt(0) === 'O') {
          return 1;
        } else {
          return a.age.localeCompare(b.age);
        }
      });

      return sorted.map(group => {
        return {
          value: group.patients,
          category: group.age
        };
      });
    }

    function byDoctor() {
      return chartData.data.map(group => {
        return {
          value: group.patients,
          category: `Dr. ${group.doctor.lastName}`
        }
      });
    }

    function byGender() {
      return chartData.data.map(group => {
        return {
          value: group.patients,
          category: group.gender.charAt(0) + group.gender.substr(1).toLocaleLowerCase()
        }
      });
    }

    if (chartData.grouping === 'age') {
      return byAge();
    } else if (chartData.grouping === 'doctor') {
      return byDoctor();
    } else if (chartData.grouping === 'gender') {
      return byGender();
    }
  }
}
