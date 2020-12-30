import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Transaction {
    item: string;
    value: any;
}

@Component({
    selector: 'bgev-booking-confirmation',
    templateUrl: './bgev-booking-confirmation.component.html',
    styleUrls: ['./bgev-booking-confirmation.component.scss']
})

export class BgEvBookingConfirmationComponent implements OnInit {
    bookingId = this.generateRandomNumber(11,99);
    startTime;
    date = this.generateRandomNumber(1,31);
    month = this.generateRandomNumber(1,12);
    time: any =this.randomDate(1,31,1,24);
    displayedColumns: string[] = ['item', 'value'];
    transactions: Transaction[] = [
        { item: 'Booking ID', value: `BGEV00${this.bookingId}` },
        { item: 'Date', value: `${this.date}/${this.month}/2020` },
        { item: 'Time of Booking', value: `${this.time}` },
        /*{ item: 'End Time', value: `${this.endTime}` },
        { item: 'Tax', value: this.currencyPipe.transform(this.tax, 'GBP')},
        { item: 'Discount', value: this.currencyPipe.transform(0, 'GBP') }, */
    ];

    constructor(private router: Router,private _snackBar: MatSnackBar){}

    generateRandomNumber(Hl: number, Ll: number) {
        return Math.floor(Math.random() * (Hl - Ll + 1)) + Ll;
    }

    randomDate(start, end, startHour, endHour) {
        let date = new Date(+start + Math.random() * (end - start));
        var hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        //let d = date.toTimeString();
        //console.log(d.substring(0,5));
        return date.toTimeString().substring(0,5);
      }

      redirectToPayment() {
        this.router.navigate(['./payment']);
      }

    ngOnInit() {
        setTimeout(() => {
            this._snackBar.open('Request Accepted', '', {
              duration: 1500
            });
          }, 2500);
    }  
}