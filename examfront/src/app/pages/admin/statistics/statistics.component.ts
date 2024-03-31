import { Component } from '@angular/core';

import {Chart,registerables} from 'node_modules/chart.js'
import { ResultService } from 'src/app/services/result.service';
// import * as Chart from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  constructor(private resultService:ResultService){}

  chartData:any
  lableData:any[]=[];
  totalCount:any[]=[];
  color:any[]=[];

  ngOnInit(){
    // this.renderChart();
    this.getStatistics();
    // this.getLable()
  }
  renderChart(lableData: any[],totalCount: any[],color: any[]){
    const ctx =  new Chart("piechart", {
      type: 'bar',
      data: {
        labels: lableData,
        datasets: [{
          // label: '# of Votes',
          data: totalCount,
          backgroundColor: color,
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getStatistics(){
    this.resultService.getStatistics().subscribe((data)=>{
      this.chartData = data
      console.log(this.chartData);
      this.getLable();
      // this.chartData.forEach((data:any) => {
      //   this.lableData.push(data.key)
      // });
    })
  }

  getLable(){
    this.chartData.forEach((data:any) => {
      this.lableData.push(data.key)
      this.totalCount.push(data.chartData.totalCount)
      this.color.push(data.chartData.color)
    });
    this.renderChart(this.lableData,this.totalCount,this.color)
    console.log(this.lableData)
    console.log(this.color)
    console.log(this.totalCount)
  }
}


