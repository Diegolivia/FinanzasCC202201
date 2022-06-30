import { Component, OnInit } from '@angular/core';
import {FormsModule, NgModel} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../services/User-service";
import {BCRPService} from "../../../services/BCRP-service";
import {GraphicLineComponent} from "../graphic/graphic-line/graphic-line.component";
import {BondService} from "../../../services/Bond-service";
import {InformationBondService} from "../../../services/InformationBond-service";
import {ResultBondService} from "../../../services/ResultBond-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform:'translateX(-30px)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ]),
    trigger('enterStateY',[
      state('void',style({
        transform:'translateY(40px)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ]),
    trigger('enterStateX2',[
      state('void',style({
        transform:'translateX(20px)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ]),
    trigger('enterStateY2',[
      state('void',style({
        transform:'translateY(-40px)',
        opacity:0
      })),
      transition(':enter',[
        animate(700,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})

export class FirstComponent implements OnInit {
  userId:number
  dataUser:any
  name:string
  lastName:string
  nameEdit:string
  lastNameEdit:string
  email:string
  emailEdit:string
  img:string
  titleBond:string
  amount:string
  dateBond:string

  showUserEdit:boolean
  priceN:string
  commercialValue:string
  interestOption:number
  rate:string
  selectRate:number
  capitalization:number
  selectFrequencyPayment:number
  plazo:string
  typeMoney:string
  method:string
  timeSelect:number
  annualDiscountRate:string
  prima:string
  floatation:string
  structuring:string
  CAVALI:string
  placement:string
  rent:string
  TCEAEmitterValue:number
  TCEAEmitterShieldValue:number
  TREABondholderValue:number
 /* TN:string*/

  /****/



  /*selectTasaInteresMercado:number*/
  arrayRowTable:any
  arrayEmitterFlowShield:any
  arrayBondholderFlow:any
  arrayActiveFlow:any
  arrayFAXPL:any
  arrayFactorConvexity:any

  arrayLong:any
  arrayShort:any

  arrayTime:any


  /*paymentTimeSelect:string*/
  /*selectTN:number*/

  VAValue:number
  VANValue:number
  DurationValue:number
  DurationMValue:number
  TIRValue:number
  ConvexityValue:number

  data:any
  dataResultBond:any
  dataInfoBond:any

  dateInfo:string
  count:number
  count2:number

  passwordaux:string
 /* dataResultBond:any
  dataBond:any*/
  constructor(private userService:UserService,private bondService:BondService,
              private informationService:InformationBondService,private resultService:ResultBondService) {
    this.userId=Number(localStorage.getItem('userId'))
    this.name=""
    this.lastName=""
    this.img=""
    this.email=""
    this.emailEdit=""
    this.nameEdit=""
    this.lastNameEdit=""
    this.titleBond="Nuevo Bono"
    this.amount="10"
    this.dateBond="0-0-0"
    this.showUserEdit=false
    this.priceN="1"
    this.commercialValue="1"
    this.interestOption=1
    this.plazo="1"
    this.typeMoney="PEN"
    this.method="Frances"
    this.capitalization=30
    this.prima="0"
    this.floatation="0"
    this.structuring="0"
    this.CAVALI="0"
    this.placement="0"
    this.passwordaux=""
    this.rent="0"
   /* this.TN="1"*/
    this.timeSelect=360
   /* this.paymentTimeSelect="Anual"*/
    this.arrayTime=[{title:"Años",time:360},{title:"Meses",time:30},{title:"Dias",time:1}]
    /*this.selectTN=0*/


    this.rate="1"
    this.selectRate=360
    this.selectFrequencyPayment=360
    this.annualDiscountRate="1"
    /*this.selectTasaInteresMercado=360*/

    this.arrayRowTable=[]
    this.arrayEmitterFlowShield=[]
    this.arrayBondholderFlow=[]
    this.arrayActiveFlow=[]
    this.arrayFAXPL=[]
    this.arrayFactorConvexity=[]

    this.arrayShort=[{Title:"Años",Time:360},{Title:"Meses",Time:30},{Title:"Dias",Time:1}]
    this.arrayLong=[{Title:"Anual",Time:360},{Title:"Semestral",Time:180},{Title:"Cuatrimestral",Time:120},
      {Title:"Trimestral",Time:90},{Title:"Bimestral",Time:60},{Title:"Mensual",Time:30},
      {Title:"Quincenal",Time:15},{Title:"Diario",Time:1}]

    this.VAValue=0
    this.VANValue=0
    this.DurationValue=0
    this.DurationMValue=0
    this.TIRValue=0
    this.ConvexityValue=0
    this.TCEAEmitterValue=0
    this.TCEAEmitterShieldValue=0
    this.TREABondholderValue=0
    this.dateInfo=""
    this.count=1
    this.count2=1
  }
  showEditProfile(){
    this.showUserEdit=!this.showUserEdit
    this.nameEdit=this.name
    this.lastNameEdit=this.lastName
    this.emailEdit=this.email
  }
  getUser(){
    this.userService.getById(this.userId).subscribe(response=>{
      /*console.log(response.name)*/
      this.dataUser=response[0]
      this.name=this.dataUser.name
      this.lastName=this.dataUser.lastName
      this.img=this.dataUser.img
      this.email=this.dataUser.email
      this.nameEdit=this.dataUser.name
      this.lastNameEdit=this.dataUser.lastName
      this.emailEdit=this.dataUser.email
      this.passwordaux=this.dataUser.password
    })
  }

  getDate(){
    let dayN=new Date()
    this.dateBond=dayN.getFullYear().toString()+"-"+(dayN.getMonth()+1).toString()+"-"+dayN.getDate().toString()
  }

  clickChangeIC(){
    this.interestOption=1
  }
  clickChangeIE(){
    this.interestOption=2
  }
  TEB(){
    let n=Math.pow(1+(Number(this.rate)/100),(this.selectFrequencyPayment/this.selectRate))-1
    return Number(n)
  }
  TEP(){
    let n=Math.pow(1+(Number(this.rate)/100)/(this.selectRate/this.capitalization),(this.selectFrequencyPayment/this.capitalization))-1
    console.log(this.rate)
    console.log(n)
    return Number(n)
  }
  COK(){
    let n=Math.pow(1+(Number(this.annualDiscountRate)/100),(this.selectFrequencyPayment/360))-1
    return Number(n)
  }
  initialIssuerCosts(){
    let n=Number(this.structuring)/100+Number(this.placement)/100+Number(this.floatation)/100+Number(this.CAVALI)/100
    n=n*Number(this.commercialValue)
    return Number(n)
  }
  bondholderInitialCosts(){
    let n=Number(this.floatation)/100+Number(this.CAVALI)/100
    n=n*Number(this.commercialValue)
    return Number(n)
  }
  period(){
    let n=Number(this.plazo)*this.timeSelect/this.selectFrequencyPayment
    return n
  }
  interest(bond:number,teb:number){
    return Number((bond*teb))
  }
  shareFrance(bond:number,teb:number,n:number){
    let powAux=Math.pow(1+teb,n)
    let x=bond*(teb*powAux)/(powAux-1)
    return Number(x)
  }
  share(interest:number,amortization:number){
    return Number((interest+amortization))
  }
  amortizationFrance(share:number,interest:number){
    return Number((share-interest))
  }
  amortizationGerman(bond:number,period:number,n:number){
    return Number((bond/(period-n+1)))
  }
  shield(interest:number){
    return Number((interest*Number(this.rent)/100).toFixed(3))
  }
  pushArrayActiveFlow(BondHolderFlow:number,cok:number,n:number){
    let x=BondHolderFlow/Math.pow(1+cok,n)
    return Number(x)
  }
  pushArrayFAXPL(ActiveFlow:number,n:number){
    let x=ActiveFlow*n*this.selectFrequencyPayment/360
    return Number(x)
  }
  pushArrayConvexity(ActiveFlow:number,n:number){
    let x=ActiveFlow*n*(1+n)
    return Number(x.toFixed(3))
  }
  VAN(price:number,array:any,cok:number,n:number){
    let va=0
    for(let i=0;i<n;i++){
      va+=array[i]/(Math.pow(1+cok,i+1))
    }
    va=va-price
    return Number(va)
  }
  VA(price:number,array:any,cok:number,n:number){
    let va=0
    for(let i=0;i<n;i++){
      va+=array[i]/(Math.pow(1+cok,i+1))
    }
    return Number(va)
  }
  duration(arrayFAXP:any,arrayActiveFlow:any,n:number){
    let sumFAXP=0
    let sumActiveFlow=0
    for(let i=0;i<n;i++){
      sumFAXP+=arrayFAXP[i]
      sumActiveFlow+=arrayActiveFlow[i]
    }
    return Number((sumFAXP/sumActiveFlow))
  }
  modifiedDuration(duration:number,cok:number){
    let x=duration/(cok+1)
    return Number(x)
  }
  convexity(arrayFactorConv:any,cok:number,arrayActiveFlow:any,n:number){
    let sumFactor=0
    let sumActiveFlow=0
    let pow=Math.pow(1+cok,2)
    for(let i=0;i<n;i++){
      sumFactor+=arrayFactorConv[i]
      sumActiveFlow+=arrayActiveFlow[i]
    }
    let x=sumFactor/(sumActiveFlow*pow*Math.pow(360/this.selectFrequencyPayment,2))
    return Number(x)
  }
  TIR(price:number,array:any,n:number){
    let maxIntentos=100000
    let delta=0.00001
    let tir=0.1
    let multiplicador=0
    if(this.VAN(price,array,tir,n)>0.00000){
      multiplicador=1
    }else{
      multiplicador=-1
    }
    let i=0
    let tirVA
    while (i<maxIntentos){
      tirVA=this.VAN(price,array,tir,n)
      if(multiplicador*tirVA>delta){
        tir += (multiplicador*delta)
        i+=1
      }
      else{
        return Number(tir)
      }
    }
    return Number(tir.toFixed(5))
  }
  TCEAEmitter(price:number,array:any,n:number){
    let tir=this.TIR(price,array,n)
    let x=Math.pow(tir+1,360/this.selectFrequencyPayment)-1
    return Number(x)
  }
  TCEAEmitterShield(price:number,array:any,n:number){
    let tir=this.TIR(price,array,n)
    let x=Math.pow(tir+1,360/this.selectFrequencyPayment)-1
    return Number(x)
  }
  TREABondholder(price:number,array:any,n:number){
    let tir=this.TIR(price,array,n)
    let x=Math.pow(tir+1,360/this.selectFrequencyPayment)-1
    return Number(x)
  }
  getPeriodDate(date:any){
   let d=date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+(date.getDate()).toString()
    return d
  }
  cashFlow(){
    this.arrayRowTable=[]
    this.arrayEmitterFlowShield=[]
    this.arrayBondholderFlow=[]
    this.arrayActiveFlow=[]
    this.arrayFAXPL=[]
    this.arrayFactorConvexity=[]
    let periodT=0
    let dateT=new Date(this.dateBond)
    dateT.setDate(dateT.getDate()+1)
    this.dateInfo=this.getPeriodDate(dateT)
    let balanceI=0
    let interestT=0
    let shareT=0
    let amortizationT=0
    let shieldT=0
    let emitterF=0
    let primaT=0
    let balanceF=0
    let period=this.period()
    let tebT=0
    if(this.interestOption==1){
      tebT=this.TEB()
    }
    else{
      tebT=this.TEP()
    }
    let cok=this.COK()

    if(this.method=="Americano"){
      for(let i=0;i<=period;i++){
        periodT=i
        if(i==0){
          emitterF=Number((Number(this.commercialValue)-this.initialIssuerCosts()).toFixed(3))
          let data={
            Periodo:periodT,
            date:this.getPeriodDate(dateT),
            SaldoI:"-",
            Interes:"-",
            Cuota:"-",
            Amort:"-",
            Escudo:"-",
            FlujoE:emitterF.toFixed(3),
            SaldoF:"-"
          }
          this.arrayRowTable.push(data)
          this.arrayEmitterFlowShield.push(emitterF)
          this.arrayBondholderFlow.push(Number((Number(this.commercialValue)+this.bondholderInitialCosts())).toFixed(3))
        }
        else{
          balanceI=Number(this.priceN)
          interestT=this.interest(balanceI,tebT)
          if(i!=period){
            amortizationT=0
          }
          if(i==period){
            amortizationT=Number(this.priceN)
          }
          shareT=this.share(interestT,amortizationT)
          shieldT=this.shield(interestT)
          if(i==period){
            primaT=Number(this.priceN)*Number(this.prima)/100
          }
          else{
            primaT=0
          }
          emitterF=Number((shareT+primaT).toFixed(3))
          balanceF=Number((balanceI-amortizationT).toFixed(3))
          let dayEdit=dateT.getDate()
          dateT.setDate(dayEdit+Number(this.selectFrequencyPayment))
          let data={
            Periodo:periodT,
            date:this.getPeriodDate(dateT),
            SaldoI:Number(balanceI),
            Interes:interestT.toFixed(3),
            Cuota:shareT.toFixed(3),
            Amort:amortizationT.toFixed(3),
            Escudo:shieldT.toFixed(3),
            FlujoE:emitterF.toFixed(3),
            SaldoF:balanceF.toFixed(3)
          }
          this.arrayRowTable.push(data)
          this.arrayEmitterFlowShield.push(Number((emitterF-shieldT).toFixed(3)))
          this.arrayBondholderFlow.push(emitterF)
          this.arrayActiveFlow.push(this.pushArrayActiveFlow(this.arrayBondholderFlow[i],cok,i))
          this.arrayFAXPL.push(this.pushArrayFAXPL(this.arrayActiveFlow[i-1],i))
          this.arrayFactorConvexity.push(this.pushArrayConvexity(this.arrayActiveFlow[i-1],i))
        }
      }
    }
    if(this.method=="Aleman"){
      for(let i=0;i<=period;i++){
        periodT=i
        if(i==0){
          emitterF=Number((Number(this.commercialValue)-this.initialIssuerCosts()).toFixed(3))
          let data={
            Periodo:periodT,
            date:this.getPeriodDate(dateT),
            SaldoI:"-",
            Interes:"-",
            Cuota:"-",
            Amort:"-",
            Escudo:"-",
            FlujoE:emitterF.toFixed(3),
            SaldoF:"-"
          }
          this.arrayRowTable.push(data)
          this.arrayEmitterFlowShield.push(emitterF)
          this.arrayBondholderFlow.push(Number((Number(this.commercialValue)+this.bondholderInitialCosts())).toFixed(3))
        }
        else{
          if(i==1){
            balanceI=Number(this.priceN)
          }
          else{
            balanceI=this.arrayRowTable[i-1].SaldoF
          }
          interestT=this.interest(balanceI,tebT)
          amortizationT=this.amortizationGerman(balanceI,period,i)

          shareT=this.share(interestT,amortizationT)
          shieldT=this.shield(interestT)
          if(i==period){
            primaT=Number(balanceI)*Number(this.prima)/100
          }
          else{
            primaT=0
          }
          emitterF=Number((shareT+primaT).toFixed(3))
          balanceF=Number((balanceI-amortizationT).toFixed(3))
          let dayEdit=dateT.getDate()
          dateT.setDate(dayEdit+Number(this.selectFrequencyPayment))
          let data={
            Periodo:periodT,
            date:this.getPeriodDate(dateT),
            SaldoI:Number(balanceI),
            Interes:interestT.toFixed(3),
            Cuota:shareT.toFixed(3),
            Amort:amortizationT.toFixed(3),
            Escudo:shieldT.toFixed(3),
            FlujoE:emitterF.toFixed(3),
            SaldoF:balanceF.toFixed(3)
          }
          this.arrayRowTable.push(data)
          this.arrayEmitterFlowShield.push(Number((emitterF-shieldT).toFixed(3)))
          this.arrayBondholderFlow.push(emitterF)
          this.arrayActiveFlow.push(this.pushArrayActiveFlow(this.arrayBondholderFlow[i],cok,i))
          this.arrayFAXPL.push(this.pushArrayFAXPL(this.arrayActiveFlow[i-1],i))
          this.arrayFactorConvexity.push(this.pushArrayConvexity(this.arrayActiveFlow[i-1],i))
        }
      }
    }
    if(this.method=="Frances"){
      for(let i=0;i<=period;i++){
        periodT=i
        if(i==0){
          emitterF=Number((Number(this.commercialValue)-this.initialIssuerCosts()).toFixed(3))
          let data={
            Periodo:periodT,
            date:this.getPeriodDate(dateT),
            SaldoI:"-",
            Interes:"-",
            Cuota:"-",
            Amort:"-",
            Escudo:"-",
            FlujoE:emitterF.toFixed(3),
            SaldoF:"-"
          }
          this.arrayRowTable.push(data)
          this.arrayEmitterFlowShield.push(emitterF)
          this.arrayBondholderFlow.push(Number((Number(this.commercialValue)+this.bondholderInitialCosts())).toFixed(3))
        }
        else{
          if(i==1){
            balanceI=Number(this.priceN)
            shareT=this.shareFrance(balanceI,tebT,period)
          }
          else if(i>1){
            balanceI=this.arrayRowTable[i-1].SaldoF
          }
          interestT=this.interest(balanceI,tebT)
          amortizationT=this.amortizationFrance(shareT,interestT)
          shieldT=this.shield(interestT)
          if(i==period){
            primaT=balanceI*Number(this.prima)/100
          }
          else{
            primaT=0
          }
          emitterF=Number((shareT+primaT).toFixed(3))
          balanceF=Number((balanceI-amortizationT).toFixed(3))
          let dayEdit=dateT.getDate()
          dateT.setDate(dayEdit+Number(this.selectFrequencyPayment))
          interestT=Number(interestT.toFixed(3))
          let data={
            Periodo:periodT,
            date:this.getPeriodDate(dateT),
            SaldoI:Number(balanceI),
            Interes:interestT,
            Cuota:shareT.toFixed(3),
            Amort:amortizationT.toFixed(3),
            Escudo:shieldT.toFixed(3),
            FlujoE:emitterF.toFixed(3),
            SaldoF:balanceF.toFixed(3)
          }
          this.arrayRowTable.push(data)
          this.arrayEmitterFlowShield.push(Number((emitterF-shieldT).toFixed(3)))
          this.arrayBondholderFlow.push(emitterF)
          this.arrayActiveFlow.push(this.pushArrayActiveFlow(this.arrayBondholderFlow[i],cok,i))
          this.arrayFAXPL.push(this.pushArrayFAXPL(this.arrayActiveFlow[i-1],i))
          this.arrayFactorConvexity.push(this.pushArrayConvexity(this.arrayActiveFlow[i-1],i))
        }
      }
    }


    /*console.log(this.arrayEmitterFlowShield)
    console.log(this.arrayBondholderFlow)
    console.log(this.arrayActiveFlow)
    console.log(this.arrayFAXPL)
    console.log(this.arrayFactorConvexity)*/
    this.VAValue=Number(this.VA(Number(this.priceN),this.arrayBondholderFlow.slice(1),cok,period).toFixed(3))
    this.VANValue=Number(this.VAN(Number(this.priceN),this.arrayBondholderFlow.slice(1),cok,period).toFixed(3))
    this.DurationValue=Number(this.duration(this.arrayFAXPL,this.arrayActiveFlow,period).toFixed(3))
    this.DurationMValue=Number(this.modifiedDuration(this.DurationValue,cok).toFixed(3))
    this.ConvexityValue=Number(this.convexity(this.arrayFactorConvexity,cok,this.arrayActiveFlow,period).toFixed(3))
    this.TIRValue=Number(this.TIR(Number(this.priceN),this.arrayBondholderFlow.slice(1),period).toFixed(4))*100
    this.TCEAEmitterValue=Number(this.TCEAEmitter(this.arrayRowTable[0].FlujoE,this.arrayBondholderFlow.slice(1),period).toFixed(4))*100
    this.TCEAEmitterShieldValue=Number(this.TCEAEmitterShield(this.arrayRowTable[0].FlujoE,this.arrayEmitterFlowShield.slice(1),period).toFixed(3))*100
    this.TREABondholderValue=Number(this.TREABondholder(this.arrayBondholderFlow[0],this.arrayBondholderFlow.slice(1),period).toFixed(4))*100
    /*console.log(this.arrayBondholderFlow.slice(1))
    console.log(cok)*/
    let day=new Date()
    /*console.log(day)*/
    this.dataResultBond={
      id:this.count,
      userId: this.userId,

      /*modifiedDuration:this.DurationMValue,
      tir:this.TIRValue,*/

      /*tceaEmitter:this.TCEAEmitterValue,
      tceaEmitterShield:this.TCEAEmitterShieldValue,
      treaBond:this.TREABondholderValue,*/
      title:this.titleBond,

      commercialValue: Number(this.commercialValue),
      amount:Number(this.amount),
      money:this.typeMoney,
     /* method:this.method,*/
    }
   /* this.dataResultBond={
      id:1,
      van:this.VANValue,
      duration:this.DurationValue,
      modifiedDuration:this.DurationMValue,
      tir:this.TIRValue,
      convexity:this.ConvexityValue,
      tceaEmitter:this.TCEAEmitterValue,
      tceaEmitterShield:this.TCEAEmitterShieldValue,
      treaBond:this.TREABondholderValue
    }*/
   /* this.dataBond={
      id: 1,
      idUser: 1,
      title:"hola",
      date:"27-11-2022",
      informationBondId: this.dataInformationBond.id,
      resultBondId: this.dataResultBond.id
    }*/
  }
  clickEditProfile(){
    let editUser={
      id:this.userId,
      name:this.nameEdit,
      lastName:this.lastNameEdit,
      email:this.emailEdit,
      password:this.passwordaux,
      img:this.img,
    }
    this.userService.editProfile(editUser).subscribe(response=>{
      console.log(response)
      this.name=this.nameEdit
      this.lastName=this.lastNameEdit
      this.email=this.emailEdit
      this.showUserEdit=false
    })
  }
  saveBond(){
    let resultId=0
    this.dataInfoBond={
      userId: this.userId,
      va:this.VAValue,
      van:this.VANValue,
      duration:this.DurationValue,
      convexity:this.ConvexityValue,
      title:this.titleBond,
      date:this.dateInfo,
      price:Number(this.priceN),
      nominalValue:Number(this.priceN),
      commercialValue:Number(this.commercialValue),
      interestType:this.interestOption,
      rate:Number(this.rate),
      selectRate:this.selectRate,
      capitalization:this.capitalization,
      timeLimit:Number(this.plazo),
      selectTimeLimit:this.timeSelect,
      selectFrequencyPayment:Number(this.selectFrequencyPayment),
      money:this.typeMoney,
      annualDiscountRate:Number(this.annualDiscountRate),
      method:this.method,
      prima:Number(this.prima),
      structuring:Number(this.structuring),
      placement:Number(this.placement),
      floatation:Number(this.floatation),
      cavali:Number(this.CAVALI),
      rent:Number(this.rent),
      amount:Number(this.amount)
    }
    this.resultService.addResultBond(this.dataInfoBond).subscribe(response=>{
      console.log(response)
      alert("Se ha guardado el bono")
      /*resultId=response.id*/

      /*this.informationService.addInformationBond(this.dataInfoBond).subscribe(response=>{
        console.log(response)
        this.count=this.count+1
        this.count2=this.count2+1
      })*/
    })
   /* this.informationService.addInformationBond(this.dataInformationBond).subscribe(response=>{
      console.log(response)
    })*/
    /*this.resultService.addResultBond(this.dataResultBond).subscribe(response=>{
      console.log(response)
    })
    this.bondService.addBond(this.dataBond).subscribe(response=>{
      console.log(response)
    })*/
  }

  ngOnInit(): void {
    this.getUser()
    this.getDate()
  }
}
