// src/app/features/categories/category-list/category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: () => this.toastr.error('Falha ao carregar as categorias.')
    });
  }

  delete(id: number): void {
    if (confirm('Tem a certeza que deseja excluir esta categoria? Dispositivos associados podem ser afetados.')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
          this.toastr.success('Categoria excluída com sucesso!');
        },
        error: () => this.toastr.error('Falha ao excluir a categoria.')
      });
    }
  }
}
