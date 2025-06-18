import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from '../../core/services/device.service';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html'
})
export class DeviceFormComponent implements OnInit {
  categories: Category[] = [];
  isEdit = false;
  id?: number;

  form = this.fb.group({
    category_id: [null, Validators.required],
    color: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(16),
        Validators.pattern('^[a-zA-Z]+$')
      ]
    ],
    partNumber: [
      null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(9999),
        Validators.pattern('^[0-9]+$')
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => this.categories = data);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.id = +id;
        this.deviceService.getById(this.id).subscribe(device => {
          this.form.patchValue(device);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      if (this.isEdit && this.id) {
        this.deviceService.update(this.id, value).subscribe(() => this.router.navigate(['/devices']));
      } else {
        this.deviceService.create(value).subscribe(() => this.router.navigate(['/devices']));
      }
    }
  }
}
