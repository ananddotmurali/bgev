import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'bgev-map-overview',
    templateUrl: 'bgev-map-overview.component.html',
    styleUrls: ['bgev-map-overview.component.scss']
})
export class BgEvMapOverviewComponent {
isSelectedAll = false;
chargerTypes = [
    { typeId: '1', selected: false },
    { typeId: '2', selected: false },
    { typeId: '3', selected: false },
];
constructor(private _bottomSheetRef: MatBottomSheetRef<BgEvMapOverviewComponent>) {}
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
        return true;
    }

    collectSelectedTypes() {
        return true;
    }
}