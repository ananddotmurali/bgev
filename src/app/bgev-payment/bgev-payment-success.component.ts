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

    showColor(starId) {
        for(let i=1;i<=5;i++) {
            let star = document.getElementById(`star_${i}`);
            if(i <= starId) {
                star.classList.add('mat-accent');
            } else {
                star.classList.remove('mat-accent');
            }
        }
    }
}