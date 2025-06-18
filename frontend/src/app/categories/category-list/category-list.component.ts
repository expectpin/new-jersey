// category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(() => this.load());
  }
}
