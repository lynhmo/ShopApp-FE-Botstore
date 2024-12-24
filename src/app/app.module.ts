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
import { NumberInputComponent } from './component/number-input/number-input.component';
import { LoginComponent } from './page/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { CartComponent } from './page/cart/cart.component';
import { GiamGiaComponent } from './component/giam-gia/giam-gia.component';
import { UserPageComponent } from './page/user-page/user-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './jwt/jwt.interceptor';
import { authGuard } from './jwt/AuthGuard.guard';
import { PaymentComponent } from './page/payment/payment.component';
import { OrderSuccessComponent } from './page/order-success/order-success.component';
import { PaymentGuard } from './guard/payment.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'detail-product/:productID', component: DetailProductComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authGuard, PaymentGuard]
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: [authGuard]
  },
  { path: '**', component: NotfoundComponent },
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
    DetailProductComponent,
    NumberInputComponent,
    LoginComponent,
    NotfoundComponent,
    CartComponent,
    GiamGiaComponent,
    UserPageComponent,
    PaymentComponent,
    OrderSuccessComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure the router
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [SliderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
