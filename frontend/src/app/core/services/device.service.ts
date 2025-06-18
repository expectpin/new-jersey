// src/app/core/services/device.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:3000/devices'; // Ajuste o URL da sua API

  constructor(private http: HttpClient) { }

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  getById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  create(device: Omit<Device, 'id'>): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  update(id: number, device: Partial<Device>): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}`, device);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
