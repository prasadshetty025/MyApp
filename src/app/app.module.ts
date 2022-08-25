import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {MatTableModule} from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appHeader } from './coin/Header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appMain } from './coin/Main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    appHeader,
    appMain
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
