import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule , JsonpModule} from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AppRoutingModule } from './app-route/app-routing.module';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
import {GrowlModule} from 'primeng/growl';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,   
    CardModule,
    ButtonModule,    
    BrowserAnimationsModule, DropdownModule, TableModule, SidebarModule, GrowlModule, DialogModule
  ],  
  declarations: [
    AppComponent,
    PedidoComponent
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
