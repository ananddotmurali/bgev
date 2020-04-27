import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AcceptDialogBoxComponent } from './accept-dialog-box.component';

@Component({
    selector: 'bgev-cp-logged-in',
    templateUrl: './bgev-cp-logged-in-component.html',
    styleUrls: ['./bgev-cp-logged-in-component.scss']
})
export class BgEvCpLoggedInComponent implements OnInit{
    user = {
        name: `CP Owner ${this.generateRandomNumber(1, 7)}`
    };
    icon: any = 1;
    noOfReq = 0;
    requests = [];
    color = 'primary';
    anyOnechecked = true;
    loadcomplete: boolean;
    ownerName: string;
    constructor(private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) {
        this._snackBar.open('Logged in Successfully.', '', {
            duration: 2000
        });
    }

    ngOnInit() {
        localStorage.setItem('loginType', 'cp');
        localStorage.setItem('name', 'Gomathi');
        this.loadcomplete = true;
        this.noOfReq = this.generateRandomNumber(0, 5);
        this.generateRandData();
        this.cpOwnerName();
    }

    generateRandomNumber(from, to) {
        return Math.floor(Math.random() * to) + from
    }

    cpOwnerName (){
        this.ownerName = localStorage.getItem('name');
    }

    randomDate(start: Date, end: Date) {
        const diff =  end.getTime() - start.getTime();
        const new_diff = diff * Math.random();
        return new Date(start.getTime() + new_diff).toString().slice(0, 16);
    }

    generateRandData() {
        let currDay = new Date();
        let nextDay = new Date(currDay.getTime() + 86400000);
        let finalArr = [];
        let iteratorObj = {};
        const users = ['Anand', 'Swaroop', 'Vijay', 'Joe', 'John', 'Priya']
        for(let i = 0; i < this.noOfReq; i++) {
            iteratorObj = {};
            iteratorObj['name'] = users[i];
            iteratorObj['type'] = this.generateRandomNumber(1, 3);
            iteratorObj['date'] = this.randomDate(currDay, nextDay);
            iteratorObj['duration'] = '10:00 - 11:00';
            iteratorObj['isAccepted'] = false;
            iteratorObj['chargeComplete'] = false;
            finalArr.push(iteratorObj);
        }
        this.requests = finalArr;
        console.log(this.requests);
    }

    requestHandler(actionType: any, index: number){
        if(actionType === 'Accepted') {
            this.requests[index]['isAccepted'] = true;
            setTimeout(() => {
                this.requests[index]['chargeComplete'] = true;
            }, 2500);
        }
        else if(actionType === 'Rejected')
        { 
            this.icon = 1;
            this.requests.splice(index, 1);
            this._snackBar.open(`Request ${actionType}`, '', {
            duration: 2000
        });
         } 
    }
    receipt() {
        this.router.navigate([`./payment`]);
    }

    openDialog(actionType: any, index: number) {
        const dialogRef = this.dialog.open(AcceptDialogBoxComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.requestHandler(actionType, index);
            }
          });
    }
}
