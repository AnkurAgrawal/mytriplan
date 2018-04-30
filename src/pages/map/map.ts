import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, MarkerOptions } from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

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
  private markerOptions: Array<MarkerOptions> = [];
  private address: string;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private nativeGeocoder: NativeGeocoder) {
    this.address = this.navParams.get('address') as string;

    this.markerOptions.push({position: new LatLng(42.346903, -71.135101)});
    this.markerOptions.push({position: new LatLng(42.36, -71.1)});
    this.markerOptions.push({position: new LatLng(42.359, -71.064)});
    this.markerOptions.push({position: new LatLng(42.3206, -71.1829)});
    this.markerOptions.push({position: new LatLng(42.3458, -71.1382)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(() => {
      this.nativeGeocoder.forwardGeocode(this.address)
      .then((coordinates: NativeGeocoderForwardResult) => {
        console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)

        let element = this.mapElement.nativeElement;
        this.map = GoogleMaps.create(element);

        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          // this.addMarker({position: new LatLng(coordinates.latitude, coordinates.longitude)});
          this.addMarker(this.markerOptions[0]);
          this.map.moveCamera({
            target: this.markerOptions[0].position,
            zoom: 10
          });
          setTimeout(() => this.addCluster(this.markerOptions), 2000);
        });
      })
      .catch((error: any) => console.log(error));
    });
  }

  isMarker(marker: LatLng | MarkerOptions): marker is MarkerOptions {
    return (<MarkerOptions>marker).position !== undefined;
  }

  addMarker(marker: LatLng | MarkerOptions) {
    let defaultMarkerOption: MarkerOptions = {
      title: '',
      icon: 'blue',
      animation: 'DROP',
      position: new LatLng(0, 0)
    };
    this.isMarker(marker)? Object.assign(defaultMarkerOption, marker): defaultMarkerOption.position = marker;
    this.map.addMarker(defaultMarkerOption)
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('Marker Clicked');
      });
    });
  }

  addCluster(markerOptions: Array<MarkerOptions>) {
    this.map.addMarkerCluster({
      markers: markerOptions,
      icons: [
        {
          min: 2,
          max: 100,
          url: './assets/icon/favicon.ico',
          label: {},
          anchor: {
            x: 16,
            y: 16
          }
        },
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
