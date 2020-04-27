import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BgevMapService } from '../shared/bgev-map-service'

@Component({
    selector: 'bgev-map-overview',
    templateUrl: 'bgev-map-overview.component.html',
    styleUrls: ['bgev-map-overview.component.scss']
})
export class BgEvMapOverviewComponent implements OnInit {
isSelectedAll = false;
chargerTypes = [
    { type: 'CHAdeMO', selected: false },
    { type: 'CCS', selected: false },
    { type: 'Untethered', selected: false },
    { type: 'Tesla Type 2', selected: false },
];
location;
latitude;
longitude;
ngOnInit() {
    const coords = new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(( position ) => {
        resolve(position.coords)

    })
    })
    this.getlocation(coords)
}
constructor(private _bottomSheetRef: MatBottomSheetRef<BgEvMapOverviewComponent>,
    private mapService: BgevMapService) {}
    openLink(event: MouseEvent): void {
        // this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    redefineSearch() {
        this._bottomSheetRef.dismiss();
        return true;
    }
    redirectToRegister(type: any) {
        console.log(type);
    }

    makeSelectAll() {
        for (var i = 0; i < this.chargerTypes.length; i++) {
            this.chargerTypes[i].selected = this.isSelectedAll;
          }
    }

    collectSelectedTypes() {
        this.isSelectedAll = this.chargerTypes.every(function(item:any) {
            return item.selected == true;
          })
    }

    async getlocation(coords) {
        const coordinates = await coords;
        const response  = await this.mapService.getAddressFromLatLng(`${coordinates.latitude}, ${coordinates.longitude}`);
        this.location = response[0].Location.Address.Label;
    }

    async getAddress(value) {
        if (value.length > 3) {
            const response  = await this.mapService.getAddress(value);
            this.location = response[0].Location.Address.Label;
        }

    }

}
