import {Component, OnInit, OnDestroy} from '@angular/core';
import {coinModel} from '../coinModel';
import {coinService} from '../appService';
import {Subscription} from 'rxjs';
import { response } from 'express';
import { io } from "socket.io-client";
import {formatNumber} from '@angular/common';

@Component({
  selector:"app-main",
  templateUrl:'./main.component.html',
  styleUrls: ['./main.component.css']

})

export class appMain implements OnInit{
  coins: coinModel[]=[];
  private coinssub: Subscription = new Subscription;
  socket: any;

  constructor(public coinService: coinService){
    this.socket=io('http://localhost:3000/')

  }


  ngOnInit() {
    this.getDataFromApi();
    this.socket.on('coinRefresh',()=>{
      this.getDataFromApi();
    })
  }

  getDataFromApi(){
    this.coinService.getCoins();
    this.coinssub=this.coinService.getPostUpdateList().subscribe((coins:coinModel[])=>{
      this.coins = coins;


    })
  }



  displayedColumns: string[] = ['No', 'name-symbol', 'price', '24h%','7d%','marketCap','vol24h','circleSupply'];



}
