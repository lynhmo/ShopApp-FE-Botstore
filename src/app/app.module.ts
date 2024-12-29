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
import { AdminPageComponent } from './admin/component/admin-page/admin-page.component';
import { AdminGuard } from './guard/admin.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from './admin/component/data-table/user-table/user-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductTableComponent } from './admin/component/data-table/product-table/product-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


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
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard]
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
    OrderSuccessComponent,
    AdminPageComponent,
    TableComponent,
    ProductTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure the router
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule, MatButtonModule, MatInputModule, MatTooltipModule,
    MatCheckboxModule
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
