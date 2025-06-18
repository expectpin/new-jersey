// device-list.component.ts
import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../core/services/device.service';
import { CategoryService } from '../../core/services/category.service';
import { Device } from '../../core/models/device.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  devices: (Device & { categoryName?: string })[] = [];
  categories: Category[] = [];

  constructor(
    private deviceService: DeviceService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
      this.deviceService.getAll().subscribe(devices => {
        this.devices = devices.map(device => ({
          ...device,
          categoryName: this.categories.find(c => c.id === device.category_id)?.name || 'Sem categoria'
        }));
      });
    });
  }

  delete(id: number) {
    this.devices = this.devices.filter(device => device.id !== id);
  }
}
