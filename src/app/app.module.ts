import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from "../route/route.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { MenuComponent } from './main/menu/menu.component';
/*import { FirstComponent } from './main/first/first.component';*/
import { LoginComponent } from './login/login/login.component';
/*import { SecondComponent } from './main/second/second.component';*/
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BondComponent } from './main/bond/bond.component';

/*import { GraphicBarComponent } from './main/graphic/graphic-bar/graphic-bar.component';*/
/*import { GraphicLineComponent } from './main/graphic/graphic-line/graphic-line.component';*/


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        /* FirstComponent,*/
        LoginComponent,
        /*GraphicLineComponent,*/
        /* SecondComponent*/
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
