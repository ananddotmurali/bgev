import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bgev-payment-success',
    templateUrl: './bgev-payment-success.component.html',
    styleUrls: ['./bgev-payment-success.component.scss']
})

export class BgEvPaymentSuccessComponent {
    constructor(private router: Router) {}
    
    goHome() {
        this.router.navigate([`./evloggedin`]);
    }
}