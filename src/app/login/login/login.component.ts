import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BCRPService} from "../../../services/BCRP-service";
import {UserService} from "../../../services/User-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  optionLogin:number
  dateI:string
  dateF:string
  email:string
  password:string
  password2:string
  name:string
  lastName:string
  correct:boolean

  nameRegister:string
  lastNameRegister:string
  emailRegister:string
  passwordRegister:string

  constructor(private router:Router,private bcrpService:BCRPService,private userService:UserService) {
    this.optionLogin=1
    this.dateF=""
    this.dateI=""
    this.email=""
    this.password=""
    this.password2=""
    this.name=""
    this.lastName=""
    this.correct=true
    this.nameRegister=""
    this.lastNameRegister=""
    this.emailRegister=""
    this.passwordRegister=""
    this.getDayIDayF()
  }
  clickChangeLogin(){
    this.optionLogin=2
    this.email=""
    this.password=""
    this.password2=""
    this.name=""
    this.lastName=""
  }
  clickChangeRegister(){
    this.optionLogin=1
    this.email=""
    this.password=""
    this.password2=""
    this.name=""
    this.lastName=""
  }
  getDayIDayF(){
    let dayNow=new Date()
    let dayI=new Date()
    this.dateF=dayNow.getFullYear().toString()+"-"+(dayNow.getMonth()+1).toString()+"-"+dayNow.getDate().toString()
    dayI.setDate(dayI.getDate()-7)
    this.dateI=dayI.getFullYear().toString()+"-"+(dayI.getMonth()+1).toString()+"-"+dayI.getDate().toString()
  }
  register(){
    let data={
      name:this.name,
      lastName:this.lastName,
      email:this.email,
      password:this.password,
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKHdD5ry7SlwlmOOxVeQ4lbXuC--5s3pMHjn_UJCqipSllLCkvv8gGwOmDkBcte6kqMZ4&usqp=CAU"
    }
    this.userService.register(data).subscribe(response=>{
      console.log(response)
    })
  }

  goToMain(){
    let id=0
    let data=0
    let d=0
    let e=0
    this.userService.login(this.email,this.password).subscribe(response=>{
      console.log(this.email)
      console.log(this.password)
      console.log(response)
      if(response.length>0){
        id=response[0].id
        localStorage.setItem('userId', id.toString());
        data=Number(localStorage.getItem('userId'))
        console.log(data)
      }
      if(id!=0){
        this.router.navigate(["/MenuDashboard/Inicio"])
        this.correct=true
      }else{
        this.correct=false
      }
    })
  }
  goToRegister(){
    let id=0
    let data={
      name:this.name,
      lastName:this.lastName,
      email:this.email,
      password:this.password,
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKHdD5ry7SlwlmOOxVeQ4lbXuC--5s3pMHjn_UJCqipSllLCkvv8gGwOmDkBcte6kqMZ4&usqp=CAU"
    }
    this.userService.register(data).subscribe(response=>{
      console.log(response)
      this.userService.login(this.email,this.password).subscribe(response=>{
        console.log(this.email)
        console.log(this.password)
        console.log(response)
        if(response.length>0){
          id=response[0].id
          localStorage.setItem('userId', id.toString());
        }
        if(id!=0){
          this.router.navigate(["/MenuDashboard/Inicio"])
          this.correct=true
        }else{
          this.correct=false
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
