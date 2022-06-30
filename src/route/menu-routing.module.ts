import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {FirstComponent} from "../app/main/first/first.component";
import {MenuComponent} from "../app/main/menu/menu.component";
import {SecondComponent} from "../app/main/second/second.component";
import {BondComponent} from "../app/main/bond/bond.component";


const routes:Routes=[
  {
    path:'',component: MenuComponent,children:[
      {path:'Inicio',component:FirstComponent},
      {path:'Segundo',component:SecondComponent,},
      {path:'Bono',component:BondComponent},
      {path:'**',redirectTo:'Inicio'}
    ]
  }
];

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MenuRoutingModule{}
