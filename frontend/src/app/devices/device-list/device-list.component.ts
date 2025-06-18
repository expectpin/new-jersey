import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeviceService } from '../../core/services/device.service';
import { CategoryService } from '../../core/services/category.service';
import { Device } from '../../core/models/device.model';
import { Category } from '../../core/models/category.model';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; // 1. Importe o ToastrService

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
    private toastr: ToastrService // 2. Injete o serviço
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
          categoryName: categories.find(c => c.id === device.category_id)?.name || 'Sem categoria'
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar dados', err);
        this.toastr.error('Erro ao carregar os dados da página.'); // Exemplo de uso
      }
    });
  }

  delete(id: number) {
    if (confirm('Tem certeza que deseja excluir este dispositivo?')) {
      this.deviceService.delete(id).subscribe({
        next: () => {
          this.devices = this.devices.filter(device => device.id !== id);
          this.toastr.success('Dispositivo excluído com sucesso!'); // 3. Use para sucesso
        },
        error: (error) => {
          console.error('Erro ao excluir dispositivo', error);
          this.toastr.error('Ocorreu um erro ao excluir o dispositivo.'); // 4. Use para erro
        }
      });
    }
  }
}
