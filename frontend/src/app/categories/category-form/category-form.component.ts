// src/app/features/categories/category-form/category-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.currentId = +id;
          return this.categoryService.getById(+id);
        }
        return [];
      })
    ).subscribe(category => {
      if (category) {
        this.categoryForm.patchValue(category);
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.toastr.error('O nome da categoria é obrigatório.');
      return;
    }

    const action = this.isEditMode && this.currentId
      ? this.categoryService.update(this.currentId, this.categoryForm.value)
      : this.categoryService.create(this.categoryForm.value);

    action.subscribe({
      next: () => {
        this.toastr.success(`Categoria ${this.isEditMode ? 'atualizada' : 'criada'} com sucesso!`);
        this.router.navigate(['/categories']).then(() => {});
      },
      error: () => this.toastr.error('Ocorreu um erro ao salvar a categoria.')
    });
  }
}
