// src/app/features/devices/device-form/device-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeviceService } from '../../core/services/device.service';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-device-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './device-form.component.html',
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  categories: Category[] = [];
  isEditMode = false;
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.deviceForm = this.fb.group({
      category_id: [null, Validators.required],
      color: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      partNumber: [null, [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]*$')
      ]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.currentId = +id;
          return this.deviceService.getById(+id);
        }
        return []; // Retorna um observable vazio se for modo de criação
      })
    ).subscribe(device => {
      if (device) {
        this.deviceForm.patchValue(device);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: () => this.toastr.error('Falha ao carregar categorias.')
    });
  }

  onSubmit(): void {
    if (this.deviceForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const action = this.isEditMode && this.currentId
      ? this.deviceService.update(this.currentId, this.deviceForm.value)
      : this.deviceService.create(this.deviceForm.value);

    action.subscribe({
      next: () => {
        this.toastr.success(`Dispositivo ${this.isEditMode ? 'atualizado' : 'criado'} com sucesso!`);
        this.router.navigate(['/devices']);
      },
      error: () => this.toastr.error('Ocorreu um erro ao salvar o dispositivo.')
    });
  }
}
