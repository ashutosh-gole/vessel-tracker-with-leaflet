import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private geoJsonUrl = 'assets/geojson/vessels.geojson';

  constructor(private http: HttpClient) { }

  getGeoJsonData(): Observable<any> {
    return this.http.get<any>(this.geoJsonUrl);
  }

}
