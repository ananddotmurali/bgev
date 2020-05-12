import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bgev-ev-logged-in',
    templateUrl: './bgev-ev-logged-in-component.html',
    styleUrls: ['./bgev-ev-logged-in-component.scss']
})

export class BgEvEvLoggedInComponent implements OnInit {
    user = {
        name: 'Anderson'
    }
    noOfReq = 0;
    requests = [];
    locations = ["North Yorkshire", "Ashbourne","Cumbriya","Bradford","Shipley","Denstone","Combridge","Penrith","Carlisle","Baslow"]
    ownerName: string;
    ngOnInit() {
        localStorage.setItem('loginType', 'ev');
        localStorage.setItem('loggedIn', 'yes');
        this.noOfReq = this.generateRandomNumber(0, 10);
        this.generateRandData();
        
    }

    constructor(private router: Router, private _snackBar: MatSnackBar) {
        this._snackBar.open('Logged In Successfully..', '', {
            duration: 3000
        });
    }

    generateRandomNumber(Hl: number, Ll: number) {
        return Math.floor(Math.random() * (Hl - Ll + 1)) + Ll;
    }

    randomDate(start: Date, end: Date) {
        let diff = end.getTime() - start.getTime();
        let new_diff = diff * Math.random();
        let date = new Date(start.getTime() + new_diff);
        let dd: any = date.getDate();
        let mm: any = date.getMonth() + 1;
        let yyyy: any = date.getFullYear();
        dd = (dd < 10) ? '0' + dd : dd;
        mm = (mm < 10) ? '0' + mm : mm;
        return `${mm}/${dd}/${yyyy}`;
    }

    

    generateRandData() {
        let currDay = new Date();
        let nextDay = new Date(currDay.getTime() + 86400000);
        let finalArr = [];
        let iteratorObj = {};
        for (let i = 0; i < this.noOfReq; i++) {
            iteratorObj = {};
            iteratorObj['name'] = `User ${i + 1}`;
            iteratorObj['location'] = this.locations[i];
            iteratorObj['type'] = this.generateRandomNumber(1, 3);
            iteratorObj['date'] = this.randomDate(currDay, nextDay);
            iteratorObj['time'] = '10: 00 - 10: 00';
            iteratorObj['isAccepted'] = true;
            iteratorObj['chargeComplete'] = true;
            finalArr.push(iteratorObj);
        }
        this.requests = finalArr;
    }
}