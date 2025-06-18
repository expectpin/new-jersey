import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeviceService } from '../../core/services/device.service';
import { CategoryService } from '../../core/services/category.service';
import { Device } from '../../core/models/device.model';
import { Category } from '../../core/models/category.model';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  devices: (Device & { categoryName?: string })[] = [];
  categories: Category[] = [];

  constructor(
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    forkJoin({
      categories: this.categoryService.getAll(),
      devices: this.deviceService.getAll()
    }).subscribe({
      next: ({ categories, devices }) => {
        this.categories = categories;
        this.devices = devices.map(device => ({
          ...device,
          categoryName: categories.find(c => c.id === device.category_id)?.name || 'N/A'
        }));
      },
      error: (err) => this.toastr.error('Falha ao carregar dados.')
    });
  }

  delete(id: number) {
    if (confirm('Tem certeza?')) {
      this.deviceService.delete(id).subscribe({
        next: () => {
          this.devices = this.devices.filter(d => d.id !== id);
          this.toastr.success('Dispositivo excluído com sucesso!');
        },
        error: () => this.toastr.error('Falha ao excluir o dispositivo.')
      });
    }
  }
}
