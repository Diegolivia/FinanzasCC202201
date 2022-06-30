import { Component, OnInit } from '@angular/core';
import {Chart, ChartConfiguration, ChartEvent, ChartType} from 'chart.js';
import {ResultBondService} from "../../../../services/ResultBond-service";
import {BCRPService} from "../../../../services/BCRP-service";
@Component({
  selector: 'app-graphic-bar',
  templateUrl: './graphic-bar.component.html',
  styleUrls: ['./graphic-bar.component.css']
})
export class GraphicBarComponent implements OnInit {
  arrayData:any
  label:any
  chart:any=[]
  auxWidth:number
  mult:number
  userId:number
  constructor(private resultService:ResultBondService,private bcrpService:BCRPService) {
    this.userId=Number(localStorage.getItem('userId'))
    this.label=[]
    this.arrayData=[]
    this.auxWidth=1
    this.mult=1
    this.getResults2()
  }
  getResults2(){
    let array:any
    this.resultService.getByUserId(this.userId).subscribe(response=>{
      console.log("aq")
      console.log(response)
      array=response
      for(let i=0;i<array.length;i++){
        if(array[i].money=="PEN"){
          this.label.push(array[i].title)
          this.arrayData.push(Number(array[i].van))
        }
      }
      this.auxWidth=0
      if(this.arrayData.length==0){
        this.auxWidth=100
      }
      if(this.arrayData.length==1){
        this.auxWidth=0
        this.mult=100
      }
      if(this.arrayData.length==2){
        this.auxWidth=0
        this.mult=50
      }
      if(this.arrayData.length>2 && this.arrayData.length<5){
        this.auxWidth=0
        this.mult=33
      }
      if(this.arrayData.length>=5){
        this.auxWidth=0
        this.mult=20
      }
      Chart.defaults.font.size = 9;
      Chart.defaults.color="#ffffff"
      this.chart=new Chart('canvas',{
        type:'bar',
        data:{
          labels:this.label,
          datasets:[{
            label:'VAN (solo Soles)',
            data:this.arrayData,
            borderColor:'#3e95cd',
            backgroundColor:'#3e95cd',
            hoverBackgroundColor:'rgba(3,104,151,0.95)',
            categoryPercentage:0.5,
          }],
        },
        options:{
          animation:{
            duration:0
          },
          layout: {
            padding: {
              bottom:0,
              right:0
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
        },


       /* type:'line',
        data:{
          labels:this.label,
          datasets:[{
            label:'Precio USD en PEN',
            data:this.arrayData,
            borderWidth:2,
            backgroundColor:'rgba(126,7,130,0.1)',
            borderColor:'#3e95cd',
            tension:0.5,
            fill:true,
            hoverBackgroundColor:'rgba(198,0,64,0.8)',
            hoverBorderColor:'rgba(255,14,20,0.9)',
            pointBackgroundColor:'#00b7ff',
            pointRadius:4
          }]
        },
        options: {

          layout: {
            padding: {
              bottom:0,
              right:0
            },
          },
          responsive:true,
          maintainAspectRatio:false,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                  family: 'Montserrat'
                },
                color:'#ffffff',
              }
            }
          }
        }*/

      })
    })
  }
  ngOnInit(): void {
  }

}
