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

  constructor(
    private vesselService: VesselService
  ) { }

  ngOnInit(): void {
    this.initializeMap();

    this.vesselService.getGeoJsonData().subscribe((geoJsonData) => {
      this.loadGeoJsonToMap(geoJsonData);
    });
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([18.330052459211366, 72.10280513066311], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private loadGeoJsonToMap(geoJsonData: any): void {
    // Define the custom vessel icon (common for all ships)
    const vesselIcon = L.icon({
      iconUrl: 'assets/icons/vessel-icon.png', // Path to the common vessel icon
      iconSize: [12, 12], // Adjust size as needed
      iconAnchor: [16, 32], // Anchor at the center bottom
    });

    L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, { icon: vesselIcon }) // Use the common vessel icon
          .bindPopup(this.createPopupContent(feature.properties));
      },
    }).addTo(this.map!);
  }

  private createPopupContent(properties: any): string {
    return `
      <div style="text-align: left;">
        <h3>${properties.name}</h3>
        <img src="${properties.image}" alt="${properties.name}" style="width: 100%; max-width: 200px; margin-bottom: 10px;">
        <p><strong>Speed:</strong> ${properties.speed} knots</p>
        <p><strong>Course:</strong> ${properties.course}°</p>
        <p><strong>Destination:</strong> ${properties.destination}</p>
        <p><strong>Description:</strong> ${properties.description}</p>
        <p><strong>ATD:</strong> ${properties.atd}</p>
        <p><strong>ETA:</strong> ${properties.eta}</p>
        <p><strong>Draft:</strong> ${properties.draft}</p>
        <p><strong>Status:</strong> ${properties.service_status}</p>
        <p><strong>Last Update:</strong> ${properties.recieved_data_time}</p>
        <p><strong>Progress:</strong> ${properties.progress}%</p>
      </div>
    `;
  }

}