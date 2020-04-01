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
    totalAmnt = this.generateRandomNumber(10, 90);
    displayedColumns: string[] = ['item', 'value'];
    transactions: Transaction[] = [
        { item: 'Consumption', value: this.generateRandomNumber(20, 50) + ' kWh' },
        { item: 'Duration', value: this.generateRandomNumber(1, 3) + ' hr' },
        { item: 'Discounts', value: this.currencyPipe.transform(0, 'GBP') },
        { item: 'Tariff', value: this.currencyPipe.transform(this.generateRandomNumber(1, 5), 'GBP') + '/hr' },
        { item: 'Misc', value: this.currencyPipe.transform(0, 'GBP') },
        { item: 'Donations', value: this.currencyPipe.transform(0, 'GBP') },
    ];
    loadComplete= false;

    constructor(private router: Router, private currencyPipe: CurrencyPipe) { }

    ngOnInit() {
        this.loginType = localStorage.getItem('loginType');
        setTimeout(() => {
            this.loadComplete = true;
        }, 5000)
    }

    generateRandomNumber(Hl: number, Ll: number) {
        return Math.floor(Math.random() * (Hl - Ll + 1)) + Ll;
    }

    paymentSuccess() {
        this.router.navigate([`./payment-success`]);
    }

    getTotalCost() {
        return this.totalAmnt;
    }
}