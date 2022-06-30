import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule,Routes} from "@angular/router";
import {MenuComponent} from "../app/main/menu/menu.component";
import {FirstComponent} from "../app/main/first/first.component";
import {LoginComponent} from "../app/login/login/login.component";

const routes:Routes=[

  /*{path:'MenuDashboard',component: MenuComponent,children:[
      {path:'Inicio/:id',component:FirstComponent}
    ]
  },*/
  /*{
    path:"MenuDashboard",component: MenuComponent
  },*/
  {
    path:'MenuDashboard',loadChildren:()=>import('./menu.module').then(m=>m.MenuModule)
  },
  {
    path:'Login',component: LoginComponent
  }
];

@NgModule({
  imports:[
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule{}
