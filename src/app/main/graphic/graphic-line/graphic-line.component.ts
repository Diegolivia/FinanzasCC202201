import { Component, OnInit } from '@angular/core';
import {Chart, ChartConfiguration, ChartEvent, ChartType} from 'chart.js';
import {BCRPService} from "../../../../services/BCRP-service";

@Component({
  selector: 'app-graphic-line',
  templateUrl: './graphic-line.component.html',
  styleUrls: ['./graphic-line.component.css']
})
export class GraphicLineComponent implements OnInit {


  label:any
  dataArray:any
  chart:any=[]
  constructor(private bcrpService:BCRPService) {
    this.label=[]
    this.dataArray=[]
    this.getChangesBCRP()
  }

  getChangesBCRP(){
    let dayNow=new Date()
    let dayI=new Date()

    let dateF=dayNow.getFullYear().toString()+"-"+(dayI.getMonth()+1).toString()
    dayI.setMonth(dayI.getMonth()-16)
    let dateI=dayI.getFullYear().toString()+"-"+(dayI.getMonth()+1).toString()


    let array=[]
    this.bcrpService.getChanges(dateI,dateF).subscribe(response=>{
      array=response.periods
      console.log(array)
      for(let i=0;i<array.length;i++){
        this.label.push(array[i].name)
        this.dataArray.push(Number(array[i].values[0]))
      }
      Chart.defaults.font.size = 10;
      Chart.defaults.color="#ffffff"
      this.chart=new Chart('canvas',{
        type:'line',
        data:{
          labels:this.label,
          datasets:[{
            label:'Precio USD en PEN',
            data:this.dataArray,
            borderWidth:2,
            backgroundColor:'rgba(88,186,186,0.1)',
            borderColor:'#3e95cd',
            tension:0.5,
            fill:true,
            hoverBackgroundColor:'rgba(198,0,64,0.8)',
            hoverBorderColor:'rgba(255,14,20,0.9)',
            pointBackgroundColor:'#00b7ff',
            pointRadius:2
          }]
        },
        options: {
          /* elements:{
           line:{
             tension:0.8
           }
         },
         scales:{
           x:{
             grid: {
               color: 'rgba(212,210,210,0.3)',
             },
           },
           y:{
             grid: {
               color: 'rgba(212,210,210,0.3)',
             },
             ticks: {
               color: 'red'
             }
           }
         },*/
          animation:{
            duration:0
          },
          layout: {
            padding: {
              bottom:10,
              right:5
            },
          },
          responsive:true,
          maintainAspectRatio:false,
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  size: 14,
                  family: 'Montserrat'
                },
                color:'#ffffff',
              }
            }
          }
        }

      })
    })
  }

  ngOnInit(): void {


  }

}
