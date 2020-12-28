import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { BgEvService } from '../shared/bgev.service';

import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BgEvMapOverviewComponent } from '../bgev-map-overview/bgev-map-overview.component';
import { BgEvConfigService } from 'app/bgev-config-service/bgev-config-service';
import { Router } from '@angular/router';
import { BgevMapService } from 'app/shared/bgev-map-service';


declare var H: any;

export interface Content {
  id: number;
  place: string;
  lat: number;
  lng: number;
  pricing: number;
  owner: string;
  availablity: string;
  typesAvailable: []
}
@Component({
  selector: 'bgev-map',
  templateUrl: './bgev-map.component.html',
  styleUrls: ['./bgev-map.component.scss']
})
export class BgEvMapComponent implements AfterViewInit {
  selectedChargerTypes: any = [];
  filteredSlideContents: any = [];
  platform: any;
  @ViewChild('mapp', { static: false }) mapElement: ElementRef;
  map: any;
  mapGroup: any;
  icon = new H.map.Icon('assets/imgs/charge2.png', { size: { w: 30, h: 30 } });
  marker: any;
  bubble: any;
  slideContents = []
  slideLen: 0;
  errorMessage: any;
  //////////////////////////////////////////////
  intersectionObserver: IntersectionObserver;
  isDarkTheme = false;
  currentIndex = 0;
  carousel: Element;
  elements: any = [];
  elementIndices = {};
  loggedIn: string;
  isLoggedIn: string;
  defaultLayers;
  price: string;
  connector = ['Type1', 'Type2', 'CCA', 'CHAdeMO', 'TeslaType2', 'Untethered'];
  Type1 = [18, 22, 25];
  Type2 = [18];
  CCA = [30];
  CHAdeMO = [32];
  TeslaType2 = [35];
  Untethered = [25, 35];
  searchService: any;

  constructor(private bgevService: BgEvService, public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private el: ElementRef, private router: Router,
    private mapService: BgevMapService) {
    this.intersectionObserver = null;
    this.platform = new H.service.Platform({
      apikey: 'Y_bhbqaJHZK-B-xpbBxIA1CavyvZ-sheohUgOqphVu8'
    });
    this.searchService = this.platform.getSearchService();
  }

  async ngAfterViewInit() {
    this.defaultLayers = this.platform.createDefaultLayers();
     this.map = new H.Map(this.mapElement.nativeElement,
      this.defaultLayers.vector.normal.map, {
      center: {lat: 20.59, lng: 78.96},
      zoom: 4,
      pixelRatio: window.devicePixelRatio || 1
    });
    navigator.geolocation.getCurrentPosition(( position ) => {
      const { latitude, longitude } = position.coords;
      this.changeCenter(latitude, longitude);
    });

    window.addEventListener('resize', () => this.map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    const ui = H.ui.UI.createDefault(this.map, this.defaultLayers);

    const ref = this._bottomSheet.open(BgEvMapOverviewComponent);

    await this.dismissAction(ref)
  }

  changeCenter(lat, lng) {
    this.map.setCenter({ lat, lng });
    this.map.setZoom(14);
  }

  addObserver() {
    console.log(this.elements);
    for (let i = 0; i < this.elements.length; i++) {
      this.elementIndices[this.elements[i].getAttribute('id')] = i;
      this.intersectionObserver.observe(this.elements[i]);
    }
  }
  getColor(obj: any) {
    return (obj.availablity) ? 'rgba(0, 200, 0, 0.8)' : 'rgba(200, 0, 0, 0.8)';
  }

  async showSearch() {
    const ref = this._bottomSheet.open(BgEvMapOverviewComponent);
    await this.dismissAction(ref);
  }
  async dismissAction(ref) {
    await ref.afterDismissed().subscribe( async(position) => {
      if(position) {
        await this.getChargepoints(position[0], position[1]);
        // this.addMarkersToMap(this.map);
        // this.zoomLocation();
      }
   })
  }

  zoomLocation() {
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      console.log(entries, observer);
      // find the entry with the largest intersection ratio
      const activated = entries.reduce((max, entry) => {
        return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
      });
      if (activated.intersectionRatio > 0) {
        this.currentIndex = this.elementIndices[activated.target.getAttribute('id')];
      }
      if (entries[0].isIntersecting) {
        this.changeLocation(this.currentIndex);
      }
    }, {
      root: this.carousel,
      threshold: 0.5
    });
    this.carousel = document.querySelector('.carousel');
    this.elements = document.querySelectorAll('.carousel > *');
    if(this.elements.length === 0) {
      setTimeout(() => {
        this.zoomLocation();
      }, 2000);
    }
    this.addObserver();
  }

  addMarkersToMap(map) {
    const marker = []
    this.slideContents.map((content) => {
      console.log(content);
      marker.push(new H.map.Marker({lat: content.lat, lng: content.lng},
        {icon: this.icon}));
    })
    const group = new H.map.Group();
    group.addObjects(marker);
    map.addObject(group);

    // map.getViewModel().setLookAtData({
    //   bounds: group.getBoundingBox()
    // });
  }

  openDialog(chargerType: string, index: number) {

        this.isLoggedIn = localStorage.getItem('loggedIn');
        if (this.isLoggedIn === 'no') {
            this.router.navigate(['./login']);
        } else {
          this.bgevService.changeData(this.slideContents[index]);
          localStorage.setItem('chargerType', chargerType);
          localStorage.setItem('price', this[chargerType][0]);
          this.router.navigate(['./request-page']);
        }
  }

  selectType(chargerType: string) {
    this.price = this[chargerType][0];
  }

  async getChargepoints(latitude, longitude) {
    const owner = ['John', 'Ram', 'Raj', 'Deepak', 'Kumar'];
    this.slideContents = []; // reset the array to flush the old data
    this.searchService.geocode({
      q: 'fuel station',
      at: `${latitude},${longitude}`
    }, (result) => {
      // Add a marker for each location found
      result.items.map(async (item, count) => {
        const { lat, lng } = item.position;
        const connectorType = [(this.connector[count]) ? this.connector[count] : this.connector[0],
        (this.connector[count + 2]) ? this.connector[count + 2] : undefined]
        const price = this[this.connector[count]] ? this[this.connector[count]] : this[this.connector[0]];
        const content = {
          id: count,
          availablity: 'Yes',
          lat,
          lng,
          owner: owner[Math.floor(Math.random() * owner.length)],
          place: item.address.label,
          pricing: price[0],
          typesAvailable: connectorType.filter(conn => conn !== undefined)

        };
        this.slideContents.push(content);
      });
      this.addMarkersToMap(this.map);
      this.zoomLocation();
    }, alert);
    /*for (let count = 0; count < 5; count ++) {
      const lat = parseFloat(latitude) + (count * 0.01);
      const long = parseFloat(longitude) + (count * count / 500);
      const response  = await this.mapService.getAddressFromLatLng(`${lat},
                ${long}`);
      const connectorType = [(this.connector[count]) ? this.connector[count] : this.connector[0],
      (this.connector[count + 2]) ? this.connector[count + 2] : undefined]
      const price = this[this.connector[count]] ? this[this.connector[count]] : this[this.connector[0]];
      const content = {
        id: count,
        availablity: 'Yes',
        lat: lat,
        lng: long,
        owner: owner[count],
        place: response[0].Location.Address.Label,
        pricing: price[0],
        typesAvailable: connectorType.filter(conn => conn !== undefined)

      } as Content
      this.slideContents.push(content);
    }*/
  }

  changeLocation(index: number) {
    const currCity = this.slideContents[index];
    const { lat, lng } = currCity;
    this.map.setCenter({ lat, lng });
    // this.map.setZoom(14);
  }


  reverseGeocode(evt, ui) {
    const { lat, lng } = evt.target.getGeometry();
    const geocoder = this.platform.getGeocodingService(),
      parameters = {
        prox: `${lat}, ${lng}, 250`,
        mode: 'retrieveAddresses',
        maxresults: '1',
        gen: '9'
      };

    geocoder.reverseGeocode(parameters,
      (result) => {
        console.log(result.Response.View[0].Result[0].Location.Address.Label);
        if (!this.bubble) {
          this.bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            // read custom data
            content: result.Response.View[0].Result[0].Location.Address.Label
          });
          ui.addBubble(this.bubble);
        } else {
          this.bubble.setPosition(evt.target.getGeometry());
          this.bubble.setContent(result.Response.View[0].Result[0].Location.Address.Label);
          this.bubble.open();
        }

      }, (error) => {
        console.log(error);
      });
  }

}
