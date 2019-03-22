import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css','../bike-list/bike-list.component.css',]
})
export class AnnonceComponent implements OnInit {

  bikeId;
  bike;
  emptyBike = true;


  constructor(dataService: DataService, private route: ActivatedRoute) { 
    //Récupère l'id dans l'url
    this.bikeId = this.route.snapshot.paramMap.get("id")
    this.bike = dataService.getBikeFromId(this.bikeId);
    if(!this.bike)
    {
      this.emptyBike = true;
    }else
    {
      this.emptyBike = false;
    }
  }

  ngOnInit() {
  }

  navigateBack()
  {
  }

  editForm(formValues)
  {
    console.log(formValues);
  }
}
