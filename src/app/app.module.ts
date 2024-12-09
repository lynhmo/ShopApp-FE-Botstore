import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AppComponent } from './app.component';
import { SliderComponent } from './component/slider/slider.component';


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
    SliderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) // Configure the router
  ],
  exports:[SliderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
