import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, Subscriber } from "rxjs";
import { map } from 'rxjs/operators';

import {coinModel} from "./coinModel";



@Injectable({ providedIn: "root" })
export class coinService {


  socket: any;
  private coins: coinModel[] = [];
  private coinsUpdated = new Subject<coinModel[]>();
  constructor(private http: HttpClient ) {


  }



  getCoins() {
    return this.http.get<{ message: string; coins: any }>("http://localhost:3000/")
    .pipe(map((coinData) => {
      return coinData.coins.map((coin: {coin: any}) => {
        return {
          id: coin.coin.id,
          name: coin.coin.name,
          symbol:coin.coin.symbol,
          price: coin.coin.price,
          percent_change_24h: coin.coin.percent_change_24h,
          percent_change_7d: coin.coin.percent_change_7d,
          market_cap: coin.coin.market_cap,
          circulating_supply: coin.coin.circulating_supply,
          volume_24h: coin.coin.volume_24h,
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.coins = transformedPosts;
      this.coinsUpdated.next([...this.coins]);
    });
  }

  getPostUpdateList() {
    return this.coinsUpdated.asObservable();
  }




}

