import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { VesselService } from '../../services/vessel/vessel.service';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private map: L.Map | undefined;
  private markers: { [id: number]: L.Marker } = {};

  constructor(
    private vesselService: VesselService
  ) { }

  ngOnInit(): void {
    this.initializeMap();

    this.vesselService.getVessels().subscribe((vessels) => {
      console.log('Vessels:', vessels);
      this.updateVesselMarkers(vessels);
    });
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([12.9716, 77.5946], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private updateVesselMarkers(vessels: any[]): void {
    vessels.forEach((vessel) => {
      if (this.markers[vessel.id]) {
        // Update existing marker
        this.markers[vessel.id].setLatLng([vessel.lat, vessel.lng]);
      } else {
        // Add new marker
        const marker = L.marker([vessel.lat, vessel.lng], {
          icon: L.icon({
            iconUrl: 'assets/icons/vessel-icon.png', // Add your custom ship icon
            iconSize: [12, 12],
            iconAnchor: [12, 41],
          }),
        }).addTo(this.map!);
        marker.bindPopup(`<b>${vessel.name}</b>`);
        this.markers[vessel.id] = marker;
      }
    });
  }

}
