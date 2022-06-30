import { Component, OnInit } from '@angular/core';
import {ResultBondService} from "../../../../services/ResultBond-service";
import {Chart, ChartConfiguration, ChartEvent, ChartType} from 'chart.js';
import {BCRPService} from "../../../../services/BCRP-service";

@Component({
  selector: 'app-graphic-pie',
  templateUrl: './graphic-pie.component.html',
  styleUrls: ['./graphic-pie.component.css']
})
export class GraphicPieComponent implements OnInit {

  arrayData2:any
  label2:any
  chart2:any=[]
  dateI:string
  dateF:string
  title:string
  USDPEN:number
  EURPEN:number
  userId:number
  constructor(private resultBondsService:ResultBondService,private bcrpService:BCRPService) {
    this.userId=Number(localStorage.getItem('userId'))
    this.arrayData2=[]
    this.label2=[]
    this.dateI=""
    this.dateF=""
    this.title=""
    this.getDayIDayF()
    this.USDPEN=1
    this.EURPEN=1
    /*this.getChangesGraph()*/
    this.getResultsGraph()

  }
  getDayIDayF(){
    let dayNow=new Date()
    let dayI=new Date()
    this.dateF=dayNow.getFullYear().toString()+"-"+(dayNow.getMonth()+1).toString()+"-"+dayNow.getDate().toString()
    dayI.setDate(dayI.getDate()-7)
    this.dateI=dayI.getFullYear().toString()+"-"+(dayI.getMonth()+1).toString()+"-"+dayI.getDate().toString()
  }
  /*getChangesGraph(){
    let arrayUSDPEN:any
    let arrayEURPEN:any
    this.bcrpService.getChangesDollarPen(this.dateI,this.dateF).subscribe(response=>{
      arrayUSDPEN=response.periods;
      this.USDPEN=arrayUSDPEN[arrayUSDPEN.length-1].values[0]
      this.bcrpService.getChangesEUROPen(this.dateI,this.dateF).subscribe(response=>{
        arrayEURPEN=response.periods;
        this.EURPEN=arrayEURPEN[arrayEURPEN.length-1].values[0]
        this.getResultsGraph()
      })
    })
  }*/
  getResultsGraph(){
    let count=0
    let auxSum= 0
    let arrayAux:any
    let auxMarketValuePen=0
    let auxMarketValueUsd=0
    let auxMarketValueEur=0
    let marketValue=0
    this.resultBondsService.getByUserId(this.userId).subscribe(response=>{
      arrayAux=response
      for(let j=0;j<arrayAux.length;j++){
        marketValue=arrayAux[j].amount*arrayAux[j].va
        if(arrayAux[j].money=="PEN"){
          auxMarketValuePen=auxMarketValuePen+marketValue
        }
        if(arrayAux[j].money=="USD"){
          auxMarketValueUsd=auxMarketValueUsd+marketValue
        }
        if(arrayAux[j].money=="EUR"){
          auxMarketValueEur=auxMarketValueEur+marketValue
        }
        auxSum=auxSum+marketValue
      }
      this.arrayData2.push(Number((auxMarketValuePen*100/auxSum).toFixed(2)))
      this.arrayData2.push(Number((auxMarketValueUsd*100/auxSum).toFixed(2)))
      this.arrayData2.push(Number((auxMarketValueEur*100/auxSum).toFixed(2)))
      this.label2=["Soles","Dolares","Euros"]
      /*Chart.defaults.font.size = 14;*/
      Chart.defaults.color="#ffffff"
      this.title="Valorización"
      this.chart2=new Chart('canvas2',{
        type:'pie',
        data:{
          labels:this.label2,
          datasets:[
            {
              label:"Montos",
              data:this.arrayData2
            }
          ]
        },
        options:{
          plugins:{
            legend:{
              display:false
            },
            title: {
              font:{size:14,family: 'Montserrat'},
              display: true,
              text: this.title,
              padding: {
                top: 0,
                bottom: 0
              }
            }
          },
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
          radius:88,
        }
      })
      /*this.chart2=new Chart('canvas2',{
        type:'line',
        data:{
          labels:this.label2,
          datasets:[{
            label:'TIR',
            data:this.arrayData2,
            borderColor:'#3e95cd',
            backgroundColor:'#3e95cd',
            hoverBackgroundColor:'rgba(3,104,151,0.95)',
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
                font: {
                  size: 14,
                  family: 'Montserrat'
                },
                color:'#ffffff',
              }
            }
          }
        },
      })*/
    })
  }

  ngOnInit(): void {
  }

}
