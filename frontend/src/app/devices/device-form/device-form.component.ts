import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from '../../core/services/device.service';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html'
})
export class DeviceFormComponent implements OnInit {
  categories: Category[] = [];
  form = this.fb.group({
    category_id: [null, Validators.required],
    color: [
      '',
      [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern('^[a-zA-Z]+$') // Apenas letras
      ]
    ],
    partNumber: [
      null,
      [
        Validators.required,
        Validators.min(1), // Número positivo
        Validators.pattern('^[0-9]+$') // Apenas números
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }

  onSubmit() {
    if (this.form.valid) {
      this.deviceService.create(this.form.value).subscribe(() => this.form.reset());
    }
  }
}
