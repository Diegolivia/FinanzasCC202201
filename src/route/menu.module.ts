import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FirstComponent} from "../app/main/first/first.component";
import {SecondComponent} from "../app/main/second/second.component";
import {MenuRoutingModule} from "./menu-routing.module";
import {FormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import {GraphicLineComponent} from "../app/main/graphic/graphic-line/graphic-line.component";
import {GraphicBarComponent} from "../app/main/graphic/graphic-bar/graphic-bar.component";
import {GraphicPieComponent} from "../app/main/graphic/graphic-pie/graphic-pie.component";
import {BondComponent} from "../app/main/bond/bond.component";
/*import {AppModule} from "../app/app.module";*/

@NgModule({
  declarations:[FirstComponent,SecondComponent,GraphicLineComponent,GraphicBarComponent,GraphicPieComponent,BondComponent],
    imports: [
        CommonModule,
        MenuRoutingModule,
        FormsModule,
        NgChartsModule,
        /* AppModule,*/
    ]
})
export class MenuModule{}
