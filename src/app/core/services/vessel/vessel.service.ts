import { Injectable } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private vessels = [
    { id: 1, name: 'Vessel A', lat: 12.9716, lng: 77.5946 },
    { id: 2, name: 'Vessel B', lat: 13.0827, lng: 80.2707 },
  ];

  getVessels(): Observable<any[]> {
    // Simulate real-time updates every 5 seconds
    return interval(5000).pipe(
      switchMap(() => of(this.vessels)),
      map((vessels) =>
        vessels.map((v) => ({
          ...v,
          lat: v.lat + (Math.random() - 0.5) * 1, // Slight random movement
          lng: v.lng + (Math.random() - 0.5) * 1,
        }))
      )
    );
  }

}
