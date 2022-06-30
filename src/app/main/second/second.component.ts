import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Renderer2} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BondService} from "../../../services/Bond-service";
import {UserService} from "../../../services/User-service";
import {BCRPService} from "../../../services/BCRP-service";
import {ResultBondService} from "../../../services/ResultBond-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-40px)',
        opacity:0
      })),
      transition(':enter',[
        animate(800,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ]),
    trigger('enterStateY',[
      state('void',style({
        transform:'translateY(30px)',
        opacity:0
      })),
      transition(':enter',[
        animate(800,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})

export class SecondComponent implements OnInit {
  @ViewChild(`asTrack`)asTrack!:ElementRef
  @ViewChild(`asContainer`)container!:ElementRef
  index:number
  maxNext:boolean
  maxPrevious:boolean
  arrayBonds:any
  containerW:any
  list:any


  dataUser:any
  name:string
  lastName:string
  nameEdit:string
  lastNameEdit:string
  email:string
  emailEdit:string
  img:string
  showUserEdit:boolean

  dateI:string
  dateF:string
  dateIExchange:string
  dateFExchange:string

  valueUSDPEN:number
  beforeValueUSDPEN:number
  diffUSDPEN:string

  valueEURPEN:number
  beforeValueEURPEN:number
  diffEURPEN:string

  valueEurDollar:number
  beforeValueEurDollar:number
  diffEurDollar:string

  valueYuan:string
  monthYuan:string
  valueYen:string
  monthYen:string
  valueLib:string
  monthLib:string
  valueFra:string
  monthFra:string
  valueReal:string
  monthReal:string
  valuePeso:string
  monthPeso:string

  arrayResults:any
  marketValueTotal:number
  marketValueTotalUsd:number
  marketValueTotalEur:number

  invTotalPen:number
  invTotalUsd:number
  invTotalEur:number

  profitLostPen:number
  profitLostUsd:number
  profitLostEur:number

  arrayResultsAux:any

  arrayPen:any
  arrayUsd:any
  arrayEur:any
  userId:number
  passwordAux:string

  constructor(private renderer:Renderer2,private bondResultService:ResultBondService,private userService:UserService,
              private bcrpService:BCRPService,private router:Router) {
    this.userId=Number(localStorage.getItem('userId'))
    this.index=0
    this.maxNext=false
    this.maxPrevious=true
    this.arrayBonds=[]

    this.name=""
    this.lastName=""
    this.img=""
    this.email=""
    this.emailEdit=""
    this.nameEdit=""
    this.lastNameEdit=""
    this.showUserEdit=false

    this.dateI="0"
    this.dateF="0"
    this.dateIExchange="0"
    this.dateFExchange="0"
    this.valueUSDPEN=0
    this.beforeValueUSDPEN=0
    this.diffUSDPEN="0"

    this.valueEURPEN=0
    this.beforeValueEURPEN=0
    this.diffEURPEN="0"
    this.passwordAux=""

    this.valueEurDollar=0
    this.beforeValueEurDollar=0
    this.diffEurDollar="0"
    this.arrayResults=[]
    this.valueYuan="0.000"
    this.monthYuan=""
    this.valueYen="0.000"
    this.monthYen=""
    this.valueLib="0.000"
    this.monthLib=""
    this.valueFra="0.000"
    this.monthFra=""
    this.valueReal="0.000"
    this.monthReal=""
    this.valuePeso="0.000"
    this.monthPeso=""
    this.marketValueTotal=0
    this.marketValueTotalUsd=0
    this.marketValueTotalEur=0
    this.invTotalPen=0
    this.invTotalUsd=0
    this.invTotalEur=0
    this.profitLostPen=0
    this.profitLostUsd=0
    this.profitLostEur=0
    this.arrayResultsAux=[]
    this.arrayPen=[]
    this.arrayUsd=[]
    this.arrayEur=[]

    this.getDayIDayF()
    this.getChangeDollarPen()
    this.getChangeEuroPen()
    this.getChangeEuroDollar()

  }
  getUser(){
    this.userService.getById( this.userId).subscribe(response=>{
      /*console.log(response.name)*/
      this.dataUser=response[0]
      this.name=this.dataUser.name
      this.lastName=this.dataUser.lastName
      this.img=this.dataUser.img
      this.email=this.dataUser.email
      this.nameEdit=this.dataUser.name
      this.lastNameEdit=this.dataUser.lastName
      this.emailEdit=this.dataUser.email
      this.passwordAux=this.dataUser.password
    })
  }
  showEditProfile(){
    this.showUserEdit=!this.showUserEdit
    this.nameEdit=this.name
    this.lastNameEdit=this.lastName
    this.emailEdit=this.email
  }
  clickEditProfile(){
    let editUser={
      id:1,
      name:this.nameEdit,
      lastName:this.lastNameEdit,
      email:this.emailEdit,
      password:this.passwordAux,
      img:this.img
    }
    this.userService.editProfile(editUser).subscribe(response=>{
      console.log(response)
      this.name=this.nameEdit
      this.lastName=this.lastNameEdit
      this.email=this.emailEdit
      this.showUserEdit=false
    })
  }
  getTotalMarketPrice(){
    let auxMarketValue=0
    let sumMarketValue=0
    let auxMarketValueUsd=0
    let sumMarketValueUsd=0
    let auxMarketValueEur=0
    let sumMarketValueEur=0

    this.bondResultService.getByUserId(this.userId).subscribe(response=>{
      this.arrayResultsAux=response
      for(let j=0;j<this.arrayResultsAux.length;j++){
        if(this.arrayResultsAux[j].money=="PEN"){
          auxMarketValue=this.arrayResultsAux[j].amount*this.arrayResultsAux[j].va
          sumMarketValue=sumMarketValue+auxMarketValue
        }
        if(this.arrayResultsAux[j].money=="USD"){
          auxMarketValueUsd=this.arrayResultsAux[j].amount*this.arrayResultsAux[j].va
          sumMarketValueUsd=sumMarketValueUsd+auxMarketValueUsd
        }
        if(this.arrayResultsAux[j].money=="EUR"){
          auxMarketValueEur=this.arrayResultsAux[j].amount*this.arrayResultsAux[j].va
          sumMarketValueEur=sumMarketValueEur+auxMarketValueEur
        }
        /*auxMarketPrice=this.arrayResultsAux[j].money=="PEN"?this.arrayResultsAux[j].va*this.arrayResultsAux[j].amount*1:this.arrayResultsAux[j].money=="USD"?this.arrayResultsAux[j].va*this.arrayResultsAux[j].amount*Number(localStorage.getItem('USDPEN')):this.arrayResultsAux[j].va*this.arrayResultsAux[j].amount*Number(localStorage.getItem('EURPEN'))
        sumMarketPrice=sumMarketPrice+auxMarketPrice*/
      }
      this.marketValueTotal=sumMarketValue
      this.marketValueTotalUsd=sumMarketValueUsd
      this.marketValueTotalEur=sumMarketValueEur

      this.getResults()
    })

  }
  getResults(){
    let auxArray=[]

    let amountInv=0
    let inv=0
    let marketValue=0
    let marketPrice=0
    let profitLost=0
    let briefcase=0

    let auxInvPen=0
    let auxInvUsd=0
    let auxInvEur=0

    let auxProfitPen=0
    let auxProfitUsd=0
    let auxProfitEur=0

    let commercialValue=0

      for(let i=0;i<this.arrayResultsAux.length;i++){
        inv=this.arrayResultsAux[i].amount*this.arrayResultsAux[i].commercialValue
        marketValue=this.arrayResultsAux[i].va*this.arrayResultsAux[i].amount
        profitLost=marketValue-inv

        if(this.arrayResultsAux[i].money=="PEN"){
          briefcase=marketValue/((this.marketValueTotal))*100
          auxInvPen=auxInvPen+inv
          auxProfitPen=auxProfitPen+profitLost
        }
        if(this.arrayResultsAux[i].money=="USD"){
          briefcase=marketValue/((this.marketValueTotalUsd))*100
          auxInvUsd=auxInvUsd+inv
          auxProfitUsd=auxProfitUsd+profitLost
        }
        if(this.arrayResultsAux[i].money=="EUR"){
          briefcase=marketValue/((this.marketValueTotalEur))*100
          auxInvEur=auxInvEur+inv
          auxProfitEur=auxProfitEur+profitLost
        }

        let data={
          id:this.arrayResultsAux[i].id,
          title:this.arrayResultsAux[i].title,
          amount:this.arrayResultsAux[i].amount,
          price:this.arrayResultsAux[i].price,
          commercialValue:this.arrayResultsAux[i].commercialValue,
          inv:inv,
          marketPrice: this.arrayResultsAux[i].va,
          marketValue: marketValue,
          profitLost:profitLost,
          profitability:(inv/profitLost),
          briefcase:briefcase,
          duration:this.arrayResultsAux[i].duration,
          convexity:this.arrayResultsAux[i].convexity
          /*money:this.arrayResultsAux[i].money,
          amountInv:amountInv,

          profitLost:profitLost,
          profitability:(profitLost/commercialValue)*100,
          percent:(marketPrice/this.marketPriceTotal)*100,
          tir:this.arrayResultsAux[i].tir,
          duration:this.arrayResultsAux[i].duration,
          convexity:this.arrayResultsAux[i].convexity*/
        }
        if(this.arrayResultsAux[i].money=="PEN"){
          this.arrayPen.push(data)
        }
        if(this.arrayResultsAux[i].money=="USD"){
          this.arrayUsd.push(data)
        }
        if(this.arrayResultsAux[i].money=="EUR"){
          this.arrayEur.push(data)
        }
        /*this.arrayResults.push(data)*/
      }
      this.invTotalPen=auxInvPen
      this.invTotalUsd=auxInvUsd
      this.invTotalEur=auxInvEur

      this.profitLostPen=auxProfitPen
      this.profitLostUsd=auxProfitUsd
      this.profitLostEur=auxProfitEur
  }
  getDayIDayF(){
    let dayNow=new Date()
    let dayI=new Date()
    this.dateF=dayNow.getFullYear().toString()+"-"+(dayNow.getMonth()+1).toString()+"-"+dayNow.getDate().toString()
    dayI.setDate(dayI.getDate()-7)
    this.dateI=dayI.getFullYear().toString()+"-"+(dayI.getMonth()+1).toString()+"-"+dayI.getDate().toString()
    this.dateFExchange=dayNow.getFullYear().toString()+"-"+(dayNow.getMonth()+1).toString()
    dayI.setMonth(dayI.getMonth()-3)
    this.dateIExchange=dayI.getFullYear().toString()+"-"+(dayI.getMonth()+1).toString()
  }
  getChangeDollarPen(){
    let arrayUSDPEN:any

    this.bcrpService.getChangesDollarPen(this.dateI,this.dateF).subscribe(response=>{
      arrayUSDPEN=response.periods;
      this.valueUSDPEN=arrayUSDPEN[arrayUSDPEN.length-1].values[0]
      if(Number(localStorage.getItem('USDPEN'))==0 ||(Number(localStorage.getItem('USDPEN'))!=0 && this.valueUSDPEN!=0)){
        localStorage.setItem('USDPEN', this.valueUSDPEN.toString());
      }
      this.beforeValueUSDPEN=arrayUSDPEN[arrayUSDPEN.length-2].values[0]
      if( this.valueUSDPEN-this.beforeValueUSDPEN>=0){
        this.diffUSDPEN="+"+(this.valueUSDPEN-this.beforeValueUSDPEN).toFixed(4)
      }else{
        this.diffUSDPEN=" "+(this.valueUSDPEN-this.beforeValueUSDPEN).toFixed(4)
      }
    })
  }
  getChangeEuroPen(){
    let arrayEURPEN:any

    this.bcrpService.getChangesEUROPen(this.dateI,this.dateF).subscribe(response=>{
      arrayEURPEN=response.periods;
      this.valueEURPEN=arrayEURPEN[arrayEURPEN.length-1].values[0]
      if(Number(localStorage.getItem('EURPEN'))==0 &&(Number(localStorage.getItem('EURPEN'))!=0 && this.valueEURPEN!=0)){
        localStorage.setItem('EURPEN', this.valueEURPEN.toString());
      }
      this.beforeValueEURPEN=arrayEURPEN[arrayEURPEN.length-2].values[0]
      if( this.valueEURPEN-this.beforeValueEURPEN>=0){
        this.diffEURPEN="+"+(this.valueEURPEN-this.beforeValueEURPEN).toFixed(4)
      }else{
        this.diffEURPEN=" "+(this.valueEURPEN-this.beforeValueEURPEN).toFixed(4)
      }
    })
  }
  getChangeEuroDollar(){
    let arrayEURDollar:any

    this.bcrpService.getChangesEuroDollar(this.dateI,this.dateF).subscribe(response=>{
      arrayEURDollar=response.periods;
      let aux:number
      console.log(arrayEURDollar)
      aux=arrayEURDollar[arrayEURDollar.length-1].values[0]
      this.valueEurDollar=aux
      this.beforeValueEurDollar=arrayEURDollar[arrayEURDollar.length-2].values[0]
      if( this.valueEurDollar-this.beforeValueEurDollar>=0){
        this.diffEurDollar="+"+(this.valueEurDollar-this.beforeValueEurDollar).toFixed(4)
      }else{
        this.diffEurDollar=" "+(this.valueEurDollar-this.beforeValueEurDollar).toFixed(4)
      }
    })
  }
  getYuan(){
    let yuan:any
    this.bcrpService.getYuan(this.dateIExchange,this.dateFExchange).subscribe(response=>{
      yuan=response.periods
      let auxYuan:number
      auxYuan=yuan[yuan.length-1].values[0]
      this.valueYuan=auxYuan.toString(3).slice(0,6)
      this.monthYuan=yuan[yuan.length-1].name
    })
  }
  getYen(){
    let yen:any
    this.bcrpService.getYen(this.dateIExchange,this.dateFExchange).subscribe(response=>{
      yen=response.periods
      let auxYen:number
      auxYen=yen[yen.length-1].values[0]
      this.valueYen=auxYen.toString(3).slice(0,6)
      this.monthYen=yen[yen.length-1].name
    })
  }
  getLib(){
    let lib:any
    this.bcrpService.getLib(this.dateIExchange,this.dateFExchange).subscribe(response=>{
      lib=response.periods
      let auxLib:number
      auxLib=lib[lib.length-1].values[0]
      this.valueLib=auxLib.toString(3).slice(0,6)
      this.monthLib=lib[lib.length-1].name
    })
  }
  getFra(){
    let fra:any
    this.bcrpService.getFra(this.dateIExchange,this.dateFExchange).subscribe(response=>{
      fra=response.periods
      let auxFra:number
      auxFra=fra[fra.length-1].values[0]
      this.valueFra=auxFra.toString(3).slice(0,6)
      this.monthFra=fra[fra.length-1].name
    })
  }
  getReal(){
    let real:any
    this.bcrpService.getReal(this.dateIExchange,this.dateFExchange).subscribe(response=>{
      real=response.periods
      let auxReal:number
      auxReal=real[real.length-1].values[0]
      this.valueReal=auxReal.toString(3).slice(0,6)
      this.monthReal=real[real.length-1].name
    })
  }
  getPeso(){
    let peso:any
    this.bcrpService.getPeso(this.dateIExchange,this.dateFExchange).subscribe(response=>{
      peso=response.periods
      let auxPeso:number
      auxPeso=peso[peso.length-1].values[0]
      this.valuePeso=auxPeso.toString(3).slice(0,6)
      this.monthPeso=peso[peso.length-1].name
    })
  }
  getBondId(id:number){
    console.log(id)
    localStorage.setItem('bondId', id.toString());
    this.router.navigate(["/MenuDashboard/Bono"])
  }
  /*Next(){
    this.index++
    this.containerW=this.container.nativeElement.offsetWidth
    this.list=this.asTrack.nativeElement
    this.maxPrevious=false
    this.list.style.transform=`translateX(-${this.index*this.containerW}px)`
    if(this.list.offsetWidth-this.index*this.containerW<this.containerW){
      this.maxNext=true
    }

  }
  Previous(){
    this.index--
    this.containerW=this.container.nativeElement.offsetWidth
    this.list=this.asTrack.nativeElement
    this.maxNext=false
    if(this.index==0 ){
      this.maxPrevious=true
    }
    this.list.style.transform=`translateX(-${this.index*this.containerW}px)`

  }
  getBonds(){
    this.bondService.getByIdUser(1).subscribe(response=>{
      this.arrayBonds=response
      console.log(this.arrayBonds)
      this.containerW=this.container.nativeElement.offsetWidth
      if(this.arrayBonds.length*200<this.containerW){
        this.maxNext=true
      }
    })
  }*/
  ngOnInit(): void {
   /* this.getBonds()*/
    this.getUser()
    this.getYuan()
    this.getYen()
    this.getLib()
    this.getFra()
    this.getReal()
    this.getPeso()
    this.getTotalMarketPrice()
  }

}
