import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  private map: GoogleMap;
  private location:LatLng;
  private locations: Array<LatLng> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.location = new LatLng(42.346903, -71.135101);

    this.locations.push(new LatLng(42.36, -71.1));
    this.locations.push(new LatLng(42.359, -71.064));
    this.locations.push(new LatLng(42.3206, -71.1829));
    this.locations.push(new LatLng(42.3458, -71.1382));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = GoogleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 1
        };

        this.map.moveCamera(options);
        setTimeout(() => (this.addCluster()), 2000);
      });
    });
  }

  addMarker() {
    this.map.addMarker({
      title: 'My Marker',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('Marker Clicked');
      });
    });
  }

  addCluster() {
    this.map.addMarkerCluster({
      markers: this.locations,
      icons: [
        {min: 2, max: 100, url: './assets/icon/', anchor: {x: 16, y: 16}},
      ]
    })
    .then((markerCluster) => {
      markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((cluster: any) => {
        console.log('click 2');
        alert('cluster was clicked.');
      });
    });
  }
}
