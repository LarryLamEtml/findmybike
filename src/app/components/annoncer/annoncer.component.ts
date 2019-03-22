import { Bikes } from './../../models/bikes';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annoncer',
  templateUrl: './annoncer.component.html',
  styleUrls: ['./annoncer.component.css']
})
export class AnnoncerComponent implements OnInit {

  bikeId: number;
  listBrands: string[];
  filterModel: string;
  filterImageUrl: string;
  filterSerialNumber: string;
  filterBrand: number;
  filterColors: string;
  filterAccessories: string[]
  filterWeight: number;
  filterLocation: string;
  filterDate: Date;
  filterComment: string;

  dataService: DataService;

  constructor(dataService: DataService) { 
    this.dataService = dataService;
  }


  ngOnInit() {
    // $(document).ready(function(){

    //   function readURL(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (e: any) => {
    //           document.getElementById('#imagePreview').style.backgroundImage = e.target.result;
    //           document.getElementById('#imagePreview').toggleAttribute("d-none");
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    //   }
      // document.getElementById("#imageUpload").onchange((e:Event) => {
      //     readURL(this);
      // });
    // });
  }

  readUrl(event, element)
  {
    let localUrl;
    for (var i = 0; i < event.target.files.length; i++) { 
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
      
      console.log ('Name: ' + name + "\n" + 
        'Type: ' + type + "\n" +
        'Last-Modified-Date: ' + modifiedDate + "\n" +
        'Size: ' + Math.round(size / 1024) + " KB");

        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
              localUrl = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
          
          element.css('background-image', 'url('+localUrl+')');
          element.hide();
          element.fadeIn(650);
      }
    }
  }

  createAnnonce()
  {
	  
        // this.bikeId,
        // this.filterModel,
        // this.filterBrand,
        // this.filterSerialNumber,
        // this.filterImageUrl,
        // this.filterColors,
        // this.filterAccessories,
        // this.filterWeight,
        // this.filterLocation,
        // this.filterDate,
        // this.filterComment,
	  
    // let newBike: Bikes;
    let newBike: any;
    
	  newBike = [
      {
        id:this.bikeId,
        model:this.filterModel,
        brand: this.filterBrand,
        serialNumber: this.filterSerialNumber,
        imageurl: this.filterImageUrl,
        color: this.filterColors,
        accessories: this.filterAccessories,
        weight: this.filterWeight,
        location: this.filterLocation,
        date: this.filterDate,
        comment: this.filterComment
      }
	  ]
	  
	  // this.dataService.createAnnonce(newBike);
	  
	  
  }

}
