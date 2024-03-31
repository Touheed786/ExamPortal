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
  failCount:any[]=[];
  passCount:any[]=[];
  color:any[]=[];

  ngOnInit(){
    // this.renderChart();
    this.getStatistics();
    // this.getLable()
  }
  renderChart(lableData: any[],totalCount: any[],color: any[],failCount:any[],passCount:any[]){
    const ctx =  new Chart("piechart", {
      type: 'bar',
      data: {
        labels: lableData,
        datasets: [
          {
          label: 'total',
          data: totalCount,
          backgroundColor: 'orange',
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
        },
          {
          label: 'pass',
          data: passCount,
          backgroundColor:'green' ,
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
        },
          {
          label: 'fail',
          data: failCount,
          backgroundColor: "red",
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
        },
      ]
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
      this.passCount.push(data.chartData.passCount)
      this.failCount.push(data.chartData.failCount)
    });
    this.renderChart(this.lableData,this.totalCount,this.color,this.passCount,this.failCount)
    console.log(this.lableData)
    console.log(this.color)
    console.log(this.totalCount)
  }
}


