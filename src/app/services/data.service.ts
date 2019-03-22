import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Colors } from './../models/colors';
import { Bikes } from './../models/bikes';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  listBikes: any[];
  listColors: Colors[];
  bikesSubject = new Subject<Bikes[]>();

  constructor(private http: HttpClient) { 
    this.http = http;

    this.listColors= [
        {
          idColor: 0,
          colorName: "Noir",
          colorCode: "#000000"
        },
        {
          idColor: 1,
          colorName: "Blanc",
          colorCode: "#ffffff"
        },
        {
          idColor: 2,
          colorName: "Rouge",
          colorCode: "#FF0000"
        },
        {
          idColor: 3,
          colorName: "Vert",
          colorCode: "#008000"
        },
        {
          idColor: 4,
          colorName: "Bleu",
          colorCode: "#0000ff"
        }
    ]

  }

  emitBikes() {
    this.bikesSubject.next(this.listBikes);
  }

  public initBike()
  {
    this.listBikes = [
      {
        id:0,
        model:"Mountainbike 26 pouces",
        brand: 1,
        serialNumber: "216872315",
        imageurl: "assets/images/moutainbike.jpg",
        color: 'Blanc',
        accessories: ["Casque noir","Cadenas bleu"],
        weight: 14.5,
        location: "Lausanne",
        date: new Date("2018-12-22"),
        comment: "Selle abimée"
      },
      {
        id:1,
        model:"VTT 34 pouces",
        brand: 2,
        serialNumber: "12381621231",
        imageurl: "assets/images/founded.PNG",
        color: 'Noir, Vert',
        accessories: ["Gants","Casque","Gourde en plastique"],
        weight: 14.5,
        location: "Pully",
        date: new Date("2019-02-15"),
        comment: "Selle abimée"
      }
      ,{
        id:2,
        model:"Crosswave retro",
        brand: 2,
        serialNumber: "216872315",
        imageurl: "assets/images/crosswave.jpg",
        color: 'Jaune',
        accessories: ["Lunettes de soleil"],
        weight: 14.5,
        location: "Lausanne",
        date: new Date("2018-12-22"),
        comment: "Selle abimée"
      },
      {
        id:3,
        model:"Early Rider Hellion Trail 20 pouces",
        serialNumber: "216872315",
        brand: 2,
        imageurl: "assets/images/earlyrider.jpg",
        color: 'Noir, Rouge',
        accessories: ["Casque","Gourde en plastique"],
        weight: 14.5,
        location: "Moudon",
        date: new Date("2019-02-15"),
        comment: "porte bouteille manquant"
      },
      {
        id:4,
        model:"MasterBike 29 pouces",
        brand: 1,
        serialNumber: "216872315",
        imageurl: "assets/images/Velo_trouve.jpg",
        color: 'Blanc',
        accessories: ["Casque noir"],
        weight: 14.5,
        location: "Chexbre",
        date: new Date("2018-12-22"),
        comment: "cadran cassé"
      },
      {
        id:5,
        model:"Leopard VTT Dynamite 24 gris",
        brand: 2,
        serialNumber: "216872315",
        imageurl: "assets/images/leopard.jpg",
        color: 'Noir, Vert, Bleu',
        accessories: ["Cadenas bleu"],
        weight: 14.5,
        location: "Lausanne",
        date: new Date("2019-02-15"),
        comment: ""
      },
    ]
  }

  public getBikes()
  {
    this.initBike();
    return this.listBikes;

  }
  
  public getDatas()
  {
    // let myValues;

    // firebase.database().ref('/bikes').once('value').then(function(snapshot) {
    //   myValues = snapshot.val();
    // });
    // console.log(myValues);
    // return myValues;

    let configUrl = 'https://cors.io/?https://findmybike-3772d.firebaseio.com/bikes';

    // return this.http.get<any>(configUrl);
    return this.http.get<any>(configUrl, { observe: 'response', responseType: 'json'},);

    // firebase.database().ref('/bikes')
    //   .once('value', function(data: DataSnapshot)
    //     {
    //       if(data.val())
    //       {
    //         this.listBikes = data.val();
    //       }else
    //       {
    //         this.listBikes = [];
    //       }
    //       this.emitBikes();
    //       console.log(this.listBikes);
    //     }
    //   );
    //   return
  }

  public getDatasJSON()
  {
    let configUrl = 'assets/bikes.json';

    return this.http.get<Bikes[]>(configUrl);

    
    

  }

  public getBikeFromId(bikeId)
  {
    let result:any = false;
    this.initBike();
    this.listBikes.forEach(bike => {
      if(bike.id == bikeId)
      {
        result = bike;
      }
    });
    return result;
  }

  public getBrands()
  {
    let brands:string[] = ['Eddy Merckx','Phoenix','BMC', 'Pinarello', 'Trek', 'Specialized', 'Giant'];
    return brands;

  }
  
}
