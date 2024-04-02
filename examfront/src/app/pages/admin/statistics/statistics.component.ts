import { Component, OnDestroy } from '@angular/core';

import {Chart,ChartOptions,registerables} from 'node_modules/chart.js'
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
  years:any[]=[];
  selectedYear:any
  chart:any

  ngOnInit(){
    this.getYear();
    // this.renderChart();
    // this.getStatistics();
    // this.getLable()
    
  }

  renderChart(lableData: any[],totalCount: any[],color: any[],passCount:any[],failCount:any[]){
    this.chart =  new Chart("piechart", {
      type: 'bar',
      data: {
        labels: lableData,
        datasets: [
          {
          label: 'total',
          data: totalCount,
          backgroundColor: 'orange',
          borderColor: "red",
          borderWidth: 1,
          // hidden:true
        },
          {
          label: 'pass',
          data: passCount,
          backgroundColor:'green' ,
          borderColor: "yellow",
          borderWidth: 1,
          // hidden:true
        },
          {
          label: 'fail',
          data: failCount,
          backgroundColor: "red",
          borderColor: "blue",
          borderWidth: 1,
          // hidden:true
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        // tooltips: {
        //   mode: 'index',
        //   intersect: false,
        //   callbacks: {
        //     label: function(tooltipItem:any, data:any) {
        //       let label = data.datasets[tooltipItem.datasetIndex].label || '';
        //       if (label) {
        //         label += ': ';
        //       }
        //       label += 'Total: ' + data.datasets[0].data[tooltipItem.index];
        //       if (data.datasets[1].data[tooltipItem.index] !== undefined) {
        //         label += ', Pass: ' + data.datasets[1].data[tooltipItem.index];
        //       }
        //       if (data.datasets[2].data[tooltipItem.index] !== undefined) {
        //         label += ', Fail: ' + data.datasets[2].data[tooltipItem.index];
        //       }
        //       return label;
        //     }
        //   }
        // }
      } as ChartOptions
    });
  }

  getStatistics(){
    this.resultService.getStatistics(this.selectedYear).subscribe((data)=>{
      this.chartData = data
      console.log(this.chartData);
      this.totalCount = [];
      this.color = []
      this.passCount = []
      this.failCount = []
      this.getLable();
      // console.log(this.selectedYear)
    })
  }

  getLable(){
    this.chartData.forEach((data:any) => {
      if (!this.chart) {
        this.lableData.push(data.key)
      }
      this.totalCount.push(data.chartData.totalCount)
      this.color.push(data.chartData.color)
      this.passCount.push(data.chartData.passCount)
      this.failCount.push(data.chartData.failCount)
    });
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart(this.lableData,this.totalCount,this.color,this.passCount,this.failCount)
    console.log(this.lableData)
    console.log(this.color)
    console.log(this.totalCount)
  }

  getYear(){
    this.resultService.getYears().subscribe((data:any)=>{
      this.years = data;
      console.log(this.years)
      // if(this.years){
        // }
        // console.log(this.years[0])
        this.selectedYear = this.years[0];
        console.log("default year ",this.selectedYear)
        this.getStatistics();
      })
  }

  changeYear(){
    this.chart.data.datasets[0].data = this.totalCount;
    this.chart.data.datasets[1].data = this.passCount;
    this.chart.data.datasets[2].data = this.failCount;
    this.renderChart(this.lableData,this.totalCount,this.color,this.passCount,this.failCount)
    this.chart.update();

  }
}


