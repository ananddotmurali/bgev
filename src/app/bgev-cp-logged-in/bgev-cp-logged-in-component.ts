import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bgev-cp-logged-in',
    templateUrl: './bgev-cp-logged-in-component.html',
    styleUrls: ['./bgev-cp-logged-in-component.scss']
})
export class BgEvCpLoggedInComponent implements OnInit{
    user = {
        name: `CP Owner ${this.generateRandomNumber(1, 7)}`
    };
    icon: any =1;
    noOfReq = 0;
    requests = [];
    color: string ="primary";
    anyOnechecked: boolean = true;
    loadcomplete: boolean;
    constructor(private router: Router, private _snackBar: MatSnackBar) {
        this._snackBar.open('Logged in Successfully.', '', {
            duration: 2000
        });
    }

    ngOnInit() {
        localStorage.setItem('loginType', 'cp');
        this.loadcomplete = true;
        this.noOfReq = this.generateRandomNumber(0, 10);
        this.generateRandData();        
    }

    generateRandomNumber(from, to) {
        return Math.floor(Math.random() * to) + from  
    }

    randomDate(start:Date, end: Date) {
        let diff =  end.getTime() - start.getTime();
        let new_diff = diff * Math.random();
        let date = new Date(start.getTime() + new_diff);
        let dd: any = date.getDate();
        let mm: any = date.getMonth()+1; 
        let yyyy: any = date.getFullYear();
        dd = (dd<10) ? '0'+dd : dd;
        mm = (mm<10) ? '0'+mm : mm;
        return `${mm}/${dd}/${yyyy}`;
    }

    generateRandData() {
        let currDay = new Date();
        let nextDay = new Date(currDay.getTime() + 86400000); 
        let finalArr = [];
        let iteratorObj = {};
        for(let i=0; i<this.noOfReq;i++) {
            iteratorObj = {};
            iteratorObj['name'] = `User ${i+1}`;
            iteratorObj['type'] = this.generateRandomNumber(1, 3);
            iteratorObj['date'] = this.randomDate(currDay, nextDay);
            iteratorObj['time'] = '10: 00 - 10: 00';
            iteratorObj['isAccepted'] = false;
            iteratorObj['chargeComplete'] = false;
            finalArr.push(iteratorObj);
        }
        this.requests = finalArr;
        console.log(this.requests);
    }

    requestHandler(actionType: any, index: number){
        console.log(actionType, index); 
        if(actionType == 'Accepted') {
            this.requests[index]['isAccepted'] = true;
            setTimeout(() => {
                this.requests[index]['chargeComplete'] = true;
            }, 2500);
        }
        else if(actionType == 'Rejected')
        { 
            this.icon = 1;
            this.requests.splice(index, 1);
            this._snackBar.open(`Request ${actionType}`, '', {
            duration: 2000
        });
         } 
    }
    
    receipt()
    {
        this.router.navigate([`./payment`]);
        
    }
}