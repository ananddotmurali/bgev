import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
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
export class BgEvMapComponent implements OnInit, AfterViewInit {
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
  price: string;
  connector = ['CCA', 'CHAdeMO', 'TeslaType2', 'Untethered'];
  CCA = [18, 22, 25];
  CHAdeMO = [18];
  TeslaType2 = [24];
  Untethered = [15, 17];

  constructor(private bgevService: BgEvService, public dialog: MatDialog, 
    private _bottomSheet: MatBottomSheet, private configService: BgEvConfigService,private router: Router,
    private mapService: BgevMapService) {
    this.intersectionObserver = null;
    this.platform = new H.service.Platform({
      apikey: 'Y_bhbqaJHZK-B-xpbBxIA1CavyvZ-sheohUgOqphVu8'
    });
  }

  ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 6,
        center: { lat: 53.6912, lng: -1.92717 },
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    this.mapGroup = new H.map.Group();
    let ui = H.ui.UI.createDefault(this.map, defaultLayers);
    ui.getControl('zoom').setVisibility(false);
    ui.getControl('scalebar').setVisibility(false);
    ui.getControl('mapsettings').setVisibility(false)
    this.map.addObject(this.mapGroup);
    this.mapGroup.addEventListener('tap', (evt: any) => {
      this.map.setCenter(evt.target.getGeometry());
      this.reverseGeocode(evt, ui);
    }, false);
    let mapEvents = new H.mapevents.MapEvents(this.map);
    let behavior = new H.mapevents.Behavior(mapEvents);

    this.startClustering();
    this.addMarkers();
    this._bottomSheet.open(BgEvMapOverviewComponent);

    /////////////////////////////////////////
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      console.log(entries, observer);
      // find the entry with the largest intersection ratio
      let activated = entries.reduce((max, entry) => {
        return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
      });
      if (activated.intersectionRatio > 0) {
        this.currentIndex = this.elementIndices[activated.target.getAttribute('id')];

        // this.renderIndicator();
      }
      if (entries[0].isIntersecting) {
        console.log('current index ->', this.currentIndex);
        this.onChange(this.currentIndex);
      }
    }, {
      root: this.carousel,
      threshold: 0.5
    });


    this.carousel = document.querySelector('.carousel');
    this.elements = document.querySelectorAll('.carousel > *');
    this.addObserver();
    /////////////////////////////////////////////////////
  }

  /////////////////////////////////////////////
  addObserver() {
    console.log(this.elements);
    for (let i = 0; i < this.elements.length; i++) {
      this.elementIndices[this.elements[i].getAttribute('id')] = i;
      this.intersectionObserver.observe(this.elements[i]);
    }
  }

  /////////////////////////////////////////////

  addMarkers() {
    let mapCoords = this.configService.getMapCoords();

    let dataPoints = mapCoords.map((item: any) => {
      let marker = new H.map.Marker({ lat: item.lat, lng: item.lng }, { icon: this.icon, min: 9 });
      marker.setData(`This is infor bubble`);
      this.mapGroup.addObject(marker);
    });
  }

  reverseGeocode(evt, ui) {
    let { lat, lng } = evt.target.getGeometry();
    let geocoder = this.platform.getGeocodingService(),
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

  onChange(index: number) {
    let currCity = this.slideContents[index];
    let { lat, lng } = currCity;
    this.map.setCenter({ lat, lng });
    this.map.setZoom(12);
  }
  getColor(obj: any) {
    return (obj.availablity) ? 'rgba(0, 200, 0, 0.8)' : 'rgba(200, 0, 0, 0.8)';
  }

  showSearch() {
    this._bottomSheet.open(BgEvMapOverviewComponent);
  }
  openDialog(chargerType: string, index: number) {
        this.bgevService.changeData(this.slideContents[index]);
        localStorage.setItem('chargerType', chargerType);
        localStorage.setItem('price', this[chargerType][0]);
        this.router.navigate(['./request-page']);
  }

  selectType(chargerType: string) {
    this.price = this[chargerType][0];
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('loggedIn');
    console.log('inside oninit');
    const coords = new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(( position ) => {
      resolve(position.coords)

    })
  })
  this.getChargepoints(coords);

  }

  startClustering(/* data: any */) {
    let data1 = this.configService.getMapCoords()
    let dataPoints = data1.map(function (item: any) {
      return new H.clustering.DataPoint(item.lat, item.lng);
    });
    let clusteredDataProvider = new H.clustering.Provider(dataPoints, {
      clusteringOptions: {
        eps: 30,
        minWeight: 2
      }
    });
    let clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);
    this.map.addLayer(clusteringLayer);
  }

  async getChargepoints(coords) {
    const coordinates = await coords;
    const owner = ['John', 'Ram', 'Raj', 'Deepak', 'Kumar']

    for (let count = 0; count < 5; count ++) {
      const lat = coordinates.latitude + (count * 0.05);
      const response  = await this.mapService.getAddressFromLatLng(`${lat},
                ${coordinates.longitude}`);
      const connectorType = [(this.connector[count]) ? this.connector[count] : this.connector[0],
      (this.connector[count + 2]) ? this.connector[count + 2] : undefined]
      const price = this[this.connector[count]] ? this[this.connector[count]] : this[this.connector[0]];
      const content = {
        id: count,
        availablity: 'Yes',
        lat: lat,
        lng: coordinates.longitude,
        owner: owner[count],
        place: response[0].Location.Address.Label,
        pricing: price[0],
        typesAvailable: connectorType.filter(conn => conn !== undefined)

      } as Content
      this.slideContents.push(content);
    }
  }
}
