import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { VesselService } from '../../services/vessel/vessel.service';
import { VesselDialogComponent } from '../vessel-dialog/vessel-dialog.component';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map | undefined;
  private vesselLayer: L.LayerGroup | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private vesselService: VesselService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeMap();

    // Fetch initial vessel data
    this.subscriptions.add(
      this.vesselService.getGeoJsonData().subscribe((geoJsonData) => {
        this.loadGeoJsonToMap(geoJsonData);
      })
    );

    // Listen for real-time updates
    this.subscriptions.add(
      this.vesselService.listenForUpdates().subscribe((updatedGeoJsonData) => {
        this.updateVesselsOnMap(updatedGeoJsonData);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([18.330052459211366, 72.10280513066311], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.vesselLayer = L.layerGroup().addTo(this.map);
  }

  private loadGeoJsonToMap(geoJsonData: any): void {
    this.vesselLayer?.clearLayers(); // Clear existing layers

    const vesselIcon = L.icon({
      iconUrl: 'assets/icons/vessel-icon.png',
      iconSize: [12, 12],
      iconAnchor: [16, 32],
    });

    L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        const marker = L.marker(latlng, { icon: vesselIcon });
        marker.on('click', () => this.openVesselDialog(feature.properties)); // Open dialog on click
        return marker;
      },
    }).addTo(this.vesselLayer!);
  }

  private updateVesselsOnMap(updatedGeoJsonData: any): void {
    this.loadGeoJsonToMap(updatedGeoJsonData); // Re-load the updated data onto the map
  }

  private openVesselDialog(properties: any): void {
    this.dialog.open(VesselDialogComponent, {
      width: '400px',
      maxHeight: '600px',
      panelClass: 'custom-dialog-container',
      data: properties, // Pass vessel data to the dialog
    });
  }

}
