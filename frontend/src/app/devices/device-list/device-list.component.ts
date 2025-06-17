import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../core/services/device.service';
import { Device } from '../../core/models/device.model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    this.deviceService.getAll().subscribe((data) => (this.devices = data));
  }

  deleteDevice(id: number) {
    this.deviceService.delete(id).subscribe(() => this.loadDevices());
  }
}
