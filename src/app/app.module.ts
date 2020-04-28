

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BgEvMapComponent } from './bgev-map/bgev-map.component';
import { RouterModule, Routes } from '@angular/router';

import { AppMaterialModule } from './app.material.module';
import { AppComponent, DialogContentComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BgEvRegisterComponent } from './bgev-register/bgev-register.component';
import { BgEvLoginComponent } from './bgev-login/bgev-login.component';
import { BgEvMapOverviewComponent } from './bgev-map-overview/bgev-map-overview.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BgEvIntroPageComponent } from './bgev-intro-page/bgev-intro-page-component';
import { BgCpOwnerComponent } from './bgev-cp-owner/bgev-cp-owner-component';
import { BgEvOwnerComponent } from './bgev-ev-owner/bgev-ev-owner-component';
import { BgEvCpLoggedInComponent } from './bgev-cp-logged-in/bgev-cp-logged-in-component';
import { BgEvEvLoggedInComponent } from './bgev-ev-logged-in/bgev-ev-logged-in-component';
import { BgEvConfigService } from './bgev-config-service/bgev-config-service';
import { BgEvSliderComponent } from './bgev-slider/bgev-slider.component';
import { BgEvPaymentComponent } from './bgev-payment/bgev-payment.component';
import { BgEvPaymentSuccessComponent } from './bgev-payment/bgev-payment-success.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BgEvChargingPageComponent } from './bgev-charging-page/bgev-charging-page.component';
import { CurrencyPipe } from '@angular/common';
import { RequestDialogBoxComponent } from './bgev-request-page/request-dialog-box.component';
import { AcceptDialogBoxComponent } from './bgev-cp-logged-in/accept-dialog-box.component';
import { BgEvRequestPageComponent } from './bgev-request-page/bgev-request-page.component';
import { MatExpansionModule } from '@angular/material/expansion';

const appRoutes: Routes = [
  { path: 'home', component: BgEvIntroPageComponent },
  { path: 'search', component: BgEvMapComponent },
  { path: 'login', component: BgEvLoginComponent },
  { path: 'register', component: BgEvRegisterComponent },
  { path: 'evowner', component: BgEvOwnerComponent },
  { path: 'cpowner', component: BgCpOwnerComponent },
  { path: 'cploggedin', component: BgEvCpLoggedInComponent },
  { path: 'evloggedin', component: BgEvEvLoggedInComponent },
  { path: 'slider', component: BgEvSliderComponent },
  { path: 'payment', component: BgEvPaymentComponent },
  { path: 'request-page', component: BgEvRequestPageComponent },
  { path: 'payment-success', component: BgEvPaymentSuccessComponent },
  { path: 'charging', component: BgEvChargingPageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    NgxMatDatetimePickerModule,
    MatMomentDateModule,
    MatRippleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  declarations: [
    AppComponent,
    DialogContentComponent,
    BgEvMapComponent,
    BgEvRegisterComponent,
    BgEvLoginComponent,
    BgEvMapOverviewComponent,
    BgEvIntroPageComponent,
    BgCpOwnerComponent,
    BgEvOwnerComponent,
    BgEvCpLoggedInComponent,
    BgEvEvLoggedInComponent,
    BgEvSliderComponent,
    BgEvPaymentComponent,
    BgEvRequestPageComponent,
    BgEvPaymentSuccessComponent,
    RequestDialogBoxComponent,
    AcceptDialogBoxComponent
  ],
  entryComponents: [DialogContentComponent, RequestDialogBoxComponent, AcceptDialogBoxComponent],
  bootstrap: [AppComponent],
  providers: [BgEvConfigService, CurrencyPipe]
})
export class AppModule { }
