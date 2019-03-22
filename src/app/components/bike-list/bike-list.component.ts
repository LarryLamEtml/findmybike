import { Bikes } from './../../models/bikes';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Columns } from 'src/app/models/columns';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {

  //Déclaration des variables
  listBikes: any[];
  // listBikes: Observable<Bikes[]>;



  localListBikes: any[] = [];
  filterModel: string;
  filterSerialNumber: string;
  listBrands: string[];
  filterBrand: string;
  filterColors: string;
  filterAccessories: string
  filterWeight: string;
  filterLocation: string;
  filterDate: Date;
  filterComment: string;
  emptyResult=false;
  searchValue: string;
  sidebarDisplay: boolean = false;
  
  //Colonnes
  columns: Columns[] = [
    {name: "Image", display: true},
    {name: "Modèle", display: true},
    {name: "N° de série", display: false},
    {name: "Marque", display: true},
    {name: "Couleur(s)", display: true},
    {name: "Accessoire(s)", display: true},
    {name: "Poid", display: true},
    {name: "Lieu", display: true},
    {name: "Date", display: true},
    {name: "Commentaire", display: true},
  ];


  //Constructeur
  constructor(dataService: DataService, private router: Router) {
    // this.listBikes = dataService.getDatas();
    // let errors;
    // dataService.getDatas().subscribe( data => { this.listBikes = data.body, error => errors = error;console.log(errors);});
    // console.log(this.listBikes);

    // let observable = dataService.getDatas();
    // observable.subscribe(data => {
    //   this.listBikes = data.body;
    //   console.log(this.listBikes);
    // });

    this.listBikes = dataService.getBikes();
    this.listBrands = dataService.getBrands();

    this.localListBikes = this.listBikes;

  }

  ngOnInit() {
    
  }

  //Affiche / Cache la sidebar
  toggleSidebar()
  {
    this.sidebarDisplay = !this.sidebarDisplay;
  }

  //Affiche / Cache la colonne concernée
  toggleColumn(col: Columns)
  {
    col.display = !col.display;
  }



  //Navigue sur la page info du vélo avec son id comme paramètre
  goToBikePage(id:number)
  {
    this.router.navigateByUrl('/annonce/'+id);
  }

  filterTable()
  {
    //Vide le tableau local
    this.localListBikes = [];

    //Parcourt chaque vélo de listbikes
    this.listBikes.forEach(bike => {
      // console.log(bike);

      //Variables temporaire pour savoir si le vélo contient les données saisies dans le filtre
      let sameModel = false;
      let sameBrand = false;
      let sameSerialNumber = false;
      let sameColor = false;
      let sameAccessory = false;
      let sameWeight = false;
      let sameLocation = false;
      let sameDate = false;
      let sameComment = false;

      //Vérifie si le modèle contient le texte saisi OU si le filtre est indéfini
      if(this.filterModel == undefined)
      {
        //Le vélo répond au filtre
        sameModel = true;
      }else
      {
        //si le modèle contient le texte saisi -> true, sinon -> false.
        sameModel = (bike.model.toLowerCase().includes(this.filterModel.toLowerCase()));
      }

      //Vérifie si le numéro de série contient le texte saisi OU si le filtre est indéfini
      if(this.filterSerialNumber == undefined)
      {
        //Le vélo répond au filtre
        sameSerialNumber = true;
      }else
      {
        //si le numéro de série contient le texte saisi -> true, sinon -> false.
        sameSerialNumber = (bike.serialNumber.toLowerCase().includes(this.filterSerialNumber.toLowerCase()));
      }

      //Vérifie si le filtre est indéfini
      if(this.filterBrand == undefined || this.filterBrand == '-1')
      {
        //Ce vélo sera dans la liste des vélos à afficher
        sameBrand = true;
      }else
      {
        //si lea marque est la même que celle choisie -> true, sinon -> false.
        sameBrand = (bike.brand == this.filterBrand);
      }

      //Vérifie si le modèle correspond
      if(this.filterColors == undefined)
      {
        sameColor = true;
      }else
      {
        sameColor = true;
        
        let listFilterColors:String[] = this.filterColors.toLowerCase().split(', ');
        listFilterColors.forEach(filterColor => {
          if(!bike.color.toLowerCase().includes(filterColor))
          {
            sameColor=false;
          }
        });
      }

      
      
      //Vérifie si la marque correspond
      if(this.filterWeight == undefined)
      {
        sameWeight = true;
      }else
      {
        sameWeight = (bike.weight == this.filterWeight);
      }

      //Vérifie si le modèle correspond
      if(this.filterLocation == undefined)
      {
        sameLocation = true;
      }else
      {
        sameLocation = (bike.location.toLowerCase().includes(this.filterLocation.toLowerCase()));
      }

      //Vérifie si la marque correspond
      if(this.filterDate == undefined)
      {
        sameDate = true;
      }else
      {
        let paramDate = (new Date(this.filterDate)).toLocaleString().split(" ");
        let bikeDate = (bike.date).toLocaleString().split(" ");

        sameDate = (paramDate[0] == bikeDate[0]);
      }

      //Vérifie si le commentaire contient le texte saisi
      if(this.filterComment == undefined)
      {
        sameComment = true;
      }else
      {
        sameComment = (bike.comment.toLowerCase().includes(this.filterComment.toLowerCase()));
      }

      //Vérifie n'importe lequel des accessoires contient le texte saisi
      if(this.filterAccessories == undefined)
      {
        sameAccessory = true;

      }else
      {
        sameAccessory = false;
        //Pour chaque accessoire du vélo
        bike.accessories.forEach(accessory => {

          //Vérifier s'il contient le texte saisi
          
          let listFilterAccessories:String[] = this.filterAccessories.toLowerCase().split(', ');
          if(listFilterAccessories.length>1)
          {
            //TODO : si accessory contient l'accessoire filtre 1, rajouter le vélo concerné dans le tableau. Ensuite parcourir ce tableau et ne garder que les vélos qui contiennent listFilterAccessories[n]. Ainsi de suite pour les n accessoires
          }else
          {
            if(accessory.toLowerCase().includes(listFilterAccessories[0]))
            {
              sameAccessory = true;
            }
          }
          
        });
      }

      //Si le champ est vide, afficher toutes les dates, sinon récupérer la date saisie
      // (this.filterDate == undefined) ? allDates = true : paramDate = new Date(this.filterDate);


      //Reprendre les deux dates en format "15/02/2019 à 01:00:00"
      // console.log(paramDate);
      // console.log((bike.date).toLocaleString());

      //Couper le string a chaque " " et garder que la partie de gauche (15/02/2019)
      // paramDate = (paramDate.toLocaleString()).split(" ");
      // let currentDate = ((bike.date).toLocaleString()).split(" ");

      // //Si les dates sont identiques
      // if(paramDate[0] == currentDate[0])
      // {
      //   console.log(paramDate[0] + ' + ' + currentDate[0]);
      // }

      // console.log(sameModel);
      // console.log(sameBrand);
      // console.log(sameColor);
      // console.log(sameAccessory);
      // console.log(sameLocation);
      // console.log(sameDate);
      // console.log(sameComment);
      // console.log('stop');

  if(sameModel && sameBrand && sameColor && sameAccessory && sameWeight && sameLocation && sameDate && sameComment && sameSerialNumber)
      {
        this.localListBikes.push(bike);
      }




      // if(bike.modele.toLowerCase().includes(this.filterModel.toLowerCase()))
      // {
      //   this.localListBikes.push(bike);
      // }
    });
    this.isEmpty();
  }

  resetFilters(form)
  {
    form.reset();
    this.localListBikes = this.listBikes;
    this.isEmpty();
  }

  isEmpty()
  {
    this.emptyResult= this.localListBikes.length<1 ? true:false;

  }

  searchInTable(paramSearch:string)
  {
    let containsSearch:boolean = false;
    let tempSearchArray:string[] = [];
    if(paramSearch == "")
    {
    this.localListBikes = this.listBikes;
      return;
    }
    this.localListBikes = [];
    paramSearch = paramSearch.toLowerCase();

    //Parcourir chaque vélo[] de la liste des vélos
    this.listBikes.forEach(function (bike:Array<any>) {

      
      //Parcourir chaque propriétés du vélo
      Object.values(bike).forEach(property => {

        //Si la propriété est un tableau
        if(Array.isArray(property))
        {
          //Parcourir chaque sous-propriétés
          property.forEach(propertyOfArray => {
            //Ajouter la sous-propriété au tableau de recherche sous format string minuscule.
            tempSearchArray.push(propertyOfArray.toString().toLowerCase());
          });
        }
        //Si la propriété n'est pas un tableau
        else
        {
          //L'ajouter au tableau de recherche sous format string minuscule.
          tempSearchArray.push(property.toString().toLowerCase());
        }
      });

      //Parcourir les strings du tableau de recherches d'un seul vélo
      tempSearchArray.forEach(str => {

        //Si le tableau du vélo contient le texte de la recherche
        if(str.includes(paramSearch))
        {
          //Rajouter le vélo concerné dans le tableau à afficher
          this.localListBikes.push(bike);
          //Contient le terme de recherche
          containsSearch=true;
        }
      });
      // console.log(tempSearchArray);
      // console.log(this.localListBikes);
      tempSearchArray=[];
        

       // property = property as Array<any>;
        // if(property.includes(paramSearch))
        // {
        //   containsSearch = true;
        //   return;
        //   // console.log(property + '= true');
        // }
      //   if(containsSearch)
      //   {
      //     return;
      //   }
        

      //   // if(Object.values(property).indexOf(paramSearch) > -1) {
      //   // }
        
      //   // if(Object.values(property).includes(paramSearch)) {
      //   // }

      //   // for (let i in Object.values(property)) {
      //   //   if(Object.values(property)[i] === paramSearch) {
      //   //   }
      //   // }
      // console.log(this.localListBikes);
      // if(containsSearch)
      //   {
      //     this.localListBikes.push(bike);
      //     console.log(this.localListBikes);
      //   }
      //   containsSearch=false;

    },this);

    // for(let bike of Object.values(this.listBikes))
    //   {
    //     let containsSearch = false;

    //     let bikeArray:any[] = (bike as Array<any>);

    //     console.log(this.isArray(bikeArray));

    //     bikeArray.forEach(function(property:Array<any>) {
    //       console.log(property);
          
    //     }); 
        

    //       // if(Array.isArray(property))
    //       // {
    //       //   if(property.includes(paramSearch))
    //       //   {
    //       //     containsSearch = true;
    //       //     return;
    //       //     // console.log(property + '= true');
    //       //   }else
    //       //   {
    //       //     console.log(property + '=?' + paramSearch)
    //       //   }
    //       // }
          
    //     if(containsSearch)
    //     {
    //       this.localListBikes.push(bike);
    //       console.log(this.localListBikes);
    //     }
    //   }
  }


  containsWord(param:string, array:string)
  {
    return array.includes(param);
  }



  // initColumns()
  // {
  //   console.log(Object.keys(this.listBikes[0]));

  //   //Pour chaque nom de propriété d'un vélo
  //   (Object.keys(this.listBikes[0])).forEach(bikeKey => {
  //     //Créer un 'Columns' avec le nom de la propriété et true 
  //     this.columns.push(
  //       { name:bikeKey, display:true }
  //     )
  //   });
  // }
}
