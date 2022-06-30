import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  expanded:boolean
  select:any
  links:any
  constructor(private router:Router) {
    this.expanded=true
    this.select=[{selected:false},{selected:false},{selected:false}]
    this.links=[{link:"/MenuDashboard/Inicio",icon:'fas fa-home',label:"Inicio"}]
  }

  clickToSecond(){
    this.router.navigate(["/MenuDashboard/Segundo"])
  }
  clickToFirst(){
    this.router.navigate(["/MenuDashboard/Inicio"])
  }
  out(){
    localStorage.setItem('userId','0');
    localStorage.removeItem('userId');
  }
  ngOnInit(): void {
  }

}
