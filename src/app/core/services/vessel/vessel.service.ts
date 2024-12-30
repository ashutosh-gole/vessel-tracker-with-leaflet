import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private geoJsonUrl = 'http://localhost:3000/api/vessels'; // Update to match your server endpoint
  private socket: Socket;

  constructor(
    private http: HttpClient
  ) {
    this.socket = io('http://localhost:3000'); // Connect to the WebSocket server
  }

  // Fetch initial GeoJSON data
  getGeoJsonData(): Observable<any> {
    return this.http.get<any>(this.geoJsonUrl);
  }

  // Listen for real-time vessel updates
  listenForUpdates(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('vessels-updated', (data) => {
        observer.next(data);
      });

      // Handle disconnection
      return () => this.socket.disconnect();
    });
  }

}
