import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgChartsModule],
})
export class HomeComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [1000, 500, 80, 1500, 56, 55, 40],
        label: 'Sale',
        fill: true,
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'rgba(255,255,0,0.3)',
      },
      {
        data: [400, 300, 600, 200, 56, 55, 40],
        label: 'Sale',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartClick(event: any) {
    console.log(event);
  }

  dynamicChange(event: any) {
    // console.log('change click');
    // this.lineChartData.labels?.push('Aug');
    // this.lineChartData.datasets.push({
    //   data: [1100, 500, 1200, 1500, 56, 55, 40, 1800],
    //   label: 'Sale',
    //   fill: true,
    //   tension: 0.5,
    //   borderColor: 'blue',
    //   backgroundColor: 'rgba(2,255,150,0.8)',
    // });
    // this.chart?.update();
  }
}
