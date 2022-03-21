import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  positions: Position[] = [];

  constructor() { }

  async ngOnInit() {
    const checkStorage = async () => {
      const { value } = await Storage.get({
        key: "positions"
      });
      if (value) {
        this.positions = JSON.parse(value);
      }
    }

    checkStorage();

    let options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 1000
    };

    Geolocation.watchPosition(options, (position) => {
      let _position: Position;
      if (position != null) {
        _position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          date: position.timestamp
        }
      }

      if (_position != null) {
        this.positions.push(_position);
      }

      if (this.positions.length % 5) {
        this.positions = this.positions.slice(this.positions.length - 5, this.positions.length);
        const setPositions = async () => {
          await Storage.set({
            key: 'positions',
            value: JSON.stringify(this.positions),
          });
        };
        setPositions();
      }
    });
  }

  async sharePosition(position: Position) {
    if ((await Share.canShare()).value) {
      await Share.share({
        title: 'Voici ma position',
        text: `Latitude : ${position.latitude} - Longitude : ${position.longitude} - Date : ${position.date}`,
        url: 'http://ionicframework.com/',
        dialogTitle: 'Partager ma position',
      });
    } else {
      console.log('Pas possible de partager');
    }
  }
}

interface Position {
  latitude: number,
  longitude: number,
  date: number
}