import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bgev-payment',
    templateUrl: './bgev-payment.component.html',
    styleUrls: ['./bgev-payment.component.css']
})

export class BgEvPaymentComponent implements OnInit{
    
    billingDetails = []
    noOfReq = 0;
    requests = [];
    loginType ;
    constructor(private router: Router) {}
    
    ngOnInit() {
        this.loginType = localStorage.getItem('loginType');
        this.generateRandData();        
    }

    generateRandomNumber(from, to) {
        return Math.floor(Math.random() * 1) + from  
    }

    generateRandData() {
        let finalArr = [];
        let iteratorObj = {};
        for(let i=0; i<1;i++) {
            iteratorObj = {};
            iteratorObj['consumption'] = this.generateRandomNumber(145, 150) +'kWh';
            iteratorObj['duration'] = this.generateRandomNumber(1,1) +'Hour';
            iteratorObj['amount'] = this.generateRandomNumber(25, 30);
            finalArr.push(iteratorObj);
        }
        this.billingDetails = finalArr;
        console.log(this.billingDetails);
        console.log(this.loginType);
    }

    paymentSuccess() {
        this.router.navigate([`./payment-success`]);
    }
}