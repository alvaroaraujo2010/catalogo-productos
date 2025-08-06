import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private apiUrl = 'https://your-api-url/positions';

  constructor(private http: HttpClient) {}

  savePosition(id: string, position: { x: number; y: number }): Observable<any> {
    return this.http.post(this.apiUrl, { id, position });
  }

  getPositions(): Observable<{ [key: string]: { x: number; y: number } }> {
    return this.http.get<{ [key: string]: { x: number; y: number } }>(this.apiUrl);
  }
}