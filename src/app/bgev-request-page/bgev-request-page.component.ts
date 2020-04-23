import {Component, OnInit} from '@angular/core'
import { BgEvService } from 'app/shared/bgev.service'

@Component({
    selector: 'bgev-request-page',
    templateUrl: 'bgev-request-page.component.html',
    styleUrls: ['bgev-request-page.component.scss']
})

export class BgEvRequestPageComponent implements OnInit{
    chargePointDetails: any = [ ]
    constructor(private bgevservice: BgEvService){}
    ngOnInit(): void {
        this.bgevservice.currentData.subscribe(data => this.chargePointDetails = data);
        console.log(this.chargePointDetails);
    }

}