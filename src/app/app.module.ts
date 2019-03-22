import { FilterPipe } from './models/filter.pipe';
import { RechercherComponent } from './components/rechercher/rechercher.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BikeListComponent } from './components/bike-list/bike-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AnnoncerComponent } from './components/annoncer/annoncer.component';
import { AnnonceComponent } from './components/annonce/annonce.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rechercher', component: BikeListComponent},
  { path: 'annoncer', component: AnnoncerComponent},
  { path: 'annonce/:id', component: AnnonceComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BikeListComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    AnnonceComponent,
    AnnoncerComponent,
    RechercherComponent,
    FilterPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [SidebarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
