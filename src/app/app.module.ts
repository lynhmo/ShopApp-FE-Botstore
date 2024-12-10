import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AppComponent } from './app.component';
import { SliderComponent } from './component/slider/slider.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { RatingStarComponent } from './component/rating-star/rating-star.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { PanigationComponent } from './component/panigation/panigation.component';
import { DetailProductComponent } from './page/detail-product/detail-product.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Default route
];


@NgModule({
  declarations: [

    HomeComponent,
    ProductComponent,
    HeaderComponent,
    FooterComponent,
    AppComponent,
    SliderComponent,
    ProductCardComponent,
    RatingStarComponent,
    SideBarComponent,
    PanigationComponent,
    DetailProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure the router
    FormsModule
  ],
  exports:[SliderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
