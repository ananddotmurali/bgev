import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

export interface Transaction {
    item: string;
    value: any;
}

@Component({
    selector: 'bgev-payment',
    templateUrl: './bgev-payment.component.html',
    styleUrls: ['./bgev-payment.component.scss']
})

export class BgEvPaymentComponent implements OnInit {
    loginType: string;
    duration = this.generateRandomNumber(1, 5);
    consumption = this.generateRandomNumber(20, 50);
    unitPrice = this.generateRandomNumber(10, 20);
    chargingCost = (this.consumption * this.unitPrice) / 100;
    tax = this.chargingCost * 20 / 100;
    totalAmount = this.chargingCost + this.tax;
    displayedColumns: string[] = ['item', 'value'];
    transactions: Transaction[] = [
        { item: 'Consumption', value: `${this.consumption} kWh` },
        { item: 'Duration', value: `${this.duration} hours` },
        { item: 'Unit price', value: `${this.unitPrice}p per kWH` },
        { item: 'Consumption Cost', value: this.currencyPipe.transform(this.chargingCost, 'GBP') },
        { item: 'Tax', value: this.currencyPipe.transform(this.tax, 'GBP')},
        { item: 'Discount', value: this.currencyPipe.transform(0, 'GBP') },
    ];
    loadComplete = false;
    isLoggedIn: string;

    constructor(private router: Router, private currencyPipe: CurrencyPipe) { }

    ngOnInit() {
        this.loginType = localStorage.getItem('loginType');
        this.isLoggedIn = localStorage.getItem('loggedIn');
        if(this.isLoggedIn == 'no') {
            this.router.navigate(['./home']);
        }
        setTimeout(() => {
            this.loadComplete = true;
        }, 10000)
    }

    generateRandomNumber(Hl: number, Ll: number) {
        return Math.floor(Math.random() * (Hl - Ll + 1)) + Ll;
    }

    paymentSuccess() {
        this.router.navigate([`./payment-success`]);
    }

}